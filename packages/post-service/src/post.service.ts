import { IPostServer, CreatePostRequest, PostCreatedResponse, DeletePostRequest, GrpcError, GetPostsRequest, GetPostsResponse, PostDto } from '@instagram-node/common';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { PostModel } from './post.model';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { EmptyResponse, DateDto } from '@instagram-node/common/protos/models/common_pb';
import { validate } from 'class-validator';
import { resources } from './resources';

export class PostAppService implements IPostServer {
    private postRepository: Repository<PostModel>

    constructor(postRepository: Repository<PostModel>) {
        this.postRepository = postRepository;
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

        const postsList: PostDto[] = posts.map(post => {
            const dto = new PostDto();
            dto.setAuthor(post.username);
            dto.setDescription(post.description);
            dto.setId(post.id);
            dto.setImageid(post.imageId);
            const dateCreate = new DateDto();
            dateCreate.setDay(post.dateCreate.getDay())
            dateCreate.setMonth(post.dateCreate.getMonth())
            dateCreate.setYear(post.dateCreate.getFullYear())
            dto.setDatecreated(dateCreate);
            return dto;
        })

        const response = new GetPostsResponse();
        response.setPostsList(postsList);

        callback(null, response);
    }

}