import { IPostServer, CreatePostRequest, PostCreatedResponse, DeletePostRequest,  GrpcError } from '@instagram-node/common';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { PostModel } from './post.model';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { EmptyResponse } from '@instagram-node/common/protos/models/common_pb';
import { validate } from 'class-validator';
import { resources } from './resources';

export class PostAppService implements IPostServer {

    private postRepository: Repository<PostModel>

    constructor(postRepository: Repository<PostModel>) {
        this.postRepository = postRepository;
    }

    public async create(call: ServerUnaryCall<CreatePostRequest>, callback: sendUnaryData<PostCreatedResponse>): Promise<void> {
        var postData = call.request.toObject();

        const post = new Post(postData.userid, postData.imageurl, postData.description, []);

        const errors = await validate(post); 
        if(errors.length>0)
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

}