import { IPostServer, CreatePostRequest, PostCreatedResponse, DeletePostRequest, GrpcError, GetPostsRequest, GetPostsResponse, PostDto, SearchByTagResponse, GetUserPostsRequest, GetUserPostsResponse } from '@instagram-node/common';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { PostModel } from './post.model';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { EmptyResponse, DateDto } from '@instagram-node/common/protos/models/common_pb';
import { validate } from 'class-validator';
import { resources } from '../resources';
import { PostLikeModel } from '../postLike/postlike.model';
import { PostRepository } from './post.repo';
import { PostCommentRepository } from '../comments/comment.repo';
import { SearchByTagRequest } from './../../../common/protos/models/post_pb.d';

export class PostGrpcService implements IPostServer {
    private postRepository: PostRepository
    private commentRepository: PostCommentRepository
    private postLikeRepository: Repository<PostLikeModel>

    constructor(postRepository: PostRepository, commentRepository: PostCommentRepository, postLikeRepository: Repository<PostLikeModel>) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.postLikeRepository = postLikeRepository;
    }

    public async create(call: ServerUnaryCall<CreatePostRequest>, callback: sendUnaryData<PostCreatedResponse>): Promise<void> {
        var postData = call.request.toObject();

        const post = new Post(postData.userid, postData.username, postData.imageid, postData.description);

        const errors = await validate(post);
        if (errors.length > 0)
            return callback(new GrpcError(status.INVALID_ARGUMENT, errors), null)

        const entity = await this.postRepository.createAndSave(post);

        const response = new PostCreatedResponse();
        response.setPostid(entity.id);
        response.setMessage(resources.info.PostHasBeenCreated);

        callback(null, response);
    }

    public async delete(call: ServerUnaryCall<DeletePostRequest>, callback: sendUnaryData<EmptyResponse>): Promise<void> {
        const post = await this.postRepository.getById(call.request.getPostid());

        if (!post)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.PostNotExist), null)

        if (post.userId !== call.request.getUserid())
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.NotPostOwner), null)

        await this.postRepository.delete(post);

        const response = new EmptyResponse();
        response.setMessage(resources.info.PostHasBeenDeleted(post.id))
        return callback(null, response)
    }

    public async getPosts(call: ServerUnaryCall<GetPostsRequest>, callback: sendUnaryData<GetPostsResponse>): Promise<void> {
        const posts = await this.postRepository.getAll();

        const postsList = await this.mapPostsToDto(posts, call.request.getUserid());

        const response = new GetPostsResponse();
        response.setPostsList(postsList);

        callback(null, response);
    }

    public async searchByTag(call: ServerUnaryCall<SearchByTagRequest>, callback: sendUnaryData<SearchByTagResponse>): Promise<void> {
        const posts = await this.postRepository.getWithTag(call.request.getTag());

        const postsList = await this.mapPostsToDto(posts, call.request.getUserid());

        const response = new SearchByTagResponse();
        response.setPostsList(postsList);

        callback(null, response);
    }

    public async getUserPosts(call: ServerUnaryCall<GetUserPostsRequest>, callback: sendUnaryData<GetUserPostsResponse> ){
        const posts = await this.postRepository.getByUserId(call.request.getUserid());

        const postsList = await this.mapPostsToDto(posts, call.request.getUserid());

        const response = new GetUserPostsResponse();
        response.setPostsList(postsList);

        callback(null, response);
    }

    private async mapPostsToDto(posts: PostModel[], userId: number) {
        return await Promise.all(posts.map(async (post) => {
            const dto = new PostDto();
            dto.setId(post.id);
            dto.setAuthor(post.username);
            dto.setDescription(post.description);
            dto.setImageid(post.imageId);
            dto.setDatecreated(this.dateToDto(post.dateCreate));
            const liked = await this.likedByUser(post.id, userId)
            dto.setLiked(liked);
            const likesCount = await this.getLikesCount(post.id);
            dto.setLikescount(likesCount);
            const commentsCount = await this.commentRepository.countCommentsForPost(post.id);
            dto.setCommentscount(commentsCount);
            return dto;
        }))
    }

    private async likedByUser(postId: number, userId: number): Promise<boolean> {
        const postLike = await this.postLikeRepository
            .createQueryBuilder('postLike')
            .where({ postId: postId, userId: userId, deleted: false })
            .getCount();
        return postLike > 0;
    }

    private async getLikesCount(postId: number): Promise<number> {
        return this.postLikeRepository.createQueryBuilder().where({ postId: postId, deleted: false }).getCount();
    }

    private dateToDto(date: Date): DateDto {
        const dto = new DateDto();
        dto.setDay(date.getDay())
        dto.setMonth(date.getMonth())
        dto.setYear(date.getFullYear())
        return dto;
    }
}