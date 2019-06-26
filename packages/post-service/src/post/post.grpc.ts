import { IPostServer, CreatePostRequest, PostCreatedResponse, DeletePostRequest, GrpcError, GetPostsRequest, GetPostsResponse, PostDto } from '@instagram-node/common';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { PostModel } from './post.model';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { EmptyResponse, DateDto } from '@instagram-node/common/protos/models/common_pb';
import { validate } from 'class-validator';
import { resources } from '../resources';
import { PostLikeModel } from '../postLike/postlike.model';

export class PostGrpcService implements IPostServer {
    private postRepository: Repository<PostModel>
    private postLikeRepository: Repository<PostLikeModel>

    constructor(postRepository: Repository<PostModel>, postLikeRepository: Repository<PostLikeModel>) {
        this.postRepository = postRepository;
        this.postLikeRepository = postLikeRepository;
    }

    public async create(call: ServerUnaryCall<CreatePostRequest>, callback: sendUnaryData<PostCreatedResponse>): Promise<void> {
        var postData = call.request.toObject();

        const post = new Post(postData.userid, postData.username, postData.imageid, postData.description);

        const errors = await validate(post);
        if (errors.length > 0)
            return callback(new GrpcError(status.INVALID_ARGUMENT, errors), null)

        let entity = this.postRepository.create(post);

        entity = await this.postRepository.save(entity);

        const response = new PostCreatedResponse();
        response.setPostid(entity.id);
        response.setMessage(resources.info.PostHasBeenCreated);

        callback(null, response);
    }

    public async delete(call: ServerUnaryCall<DeletePostRequest>, callback: sendUnaryData<EmptyResponse>): Promise<void> {
        const post = await this.postRepository.createQueryBuilder().where({ postId: call.request.getPostid, userId: call.request.getUserid }).getOne();

        if (!post)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.PostNotExist), null)

        await this.postRepository.delete(post);

        const response = new EmptyResponse();
        response.setMessage(resources.info.PostHasBeenDeleted(post.id))
        return callback(null, response)
    }

    public async getPosts(call: ServerUnaryCall<GetPostsRequest>, callback: sendUnaryData<GetPostsResponse>): Promise<void> {
        const posts = await this.postRepository.find();

        const postsList = await this.mapPostsToDto(posts, call.request.getUserid());

        const response = new GetPostsResponse();
        response.setPostsList(postsList);

        callback(null, response);
    }

    private async mapPostsToDto(posts:PostModel[], userId:number){
        return await Promise.all(posts.map(async (post) => {
            const dto = new PostDto();
            dto.setAuthor(post.username);
            dto.setDescription(post.description);
            dto.setId(post.id);
            dto.setImageid(post.imageId);
            dto.setDatecreated(this.setDate(post.dateCreate));
            const liked = await this.likedByUser(post.id, userId)
            dto.setLiked(liked);
            const likesCount = await this.getLikesCount(post.id);
            dto.setLikes(likesCount);
            return dto;
        }))
    }

    private async likedByUser(postId:number, userId: number): Promise<boolean> {
        const postLike = await this.postLikeRepository.createQueryBuilder('postLike').where(`postLike.postId = :postId AND postLike.userId = :userId AND postLike.deleted = false` , {postId, userId}).getCount();
        return postLike > 0;
    }

    private async getLikesCount(postId: number): Promise<number> {
        const likes = await this.postLikeRepository.findAndCount({ postId: postId, deleted: false });
        return likes[1];
    }

    private setDate(date: Date): DateDto {
        const dateCreate = new DateDto();
        dateCreate.setDay(date.getDay())
        dateCreate.setMonth(date.getMonth())
        dateCreate.setYear(date.getFullYear())
        return dateCreate;
    }
}