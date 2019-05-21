import { IPostServer, CreatePostRequest, PostCreatedResponse, DeletePostRequest,  GrpcError } from '@instagram-node/common';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { PostModel } from './post.model';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { EmptyResponse } from '@instagram-node/common/protos/models/common_pb';

export class PostAppService implements IPostServer {

    private postRepository: Repository<PostModel>

    constructor(postRepository: Repository<PostModel>) {
        this.postRepository = postRepository;
    }

    public async add(call: ServerUnaryCall<CreatePostRequest>, callback: sendUnaryData<PostCreatedResponse>): Promise<void> {
        var postData = call.request.toObject();

        const post = new Post(postData.userid, postData.imageurl, postData.description, []);
        let entity = this.postRepository.create(post);

        entity = await this.postRepository.save(entity);

        const response = new PostCreatedResponse();
        response.setPostid(entity.id);
        response.setMessage("Post has been created");

        callback(null, response);
    }

    public async delete(call: ServerUnaryCall<DeletePostRequest>, callback: sendUnaryData<EmptyResponse>): Promise<void> {
        const post = await this.postRepository.createQueryBuilder().where({ postId: call.request.getPostid, userId: call.request.getUserid }).getOne();

        if (!post)
            return callback(new GrpcError(status.INVALID_ARGUMENT, "Post not exist, or you are not an owner"), null)


        await this.postRepository.delete(post);

        const response = new EmptyResponse();
        response.setMessage(`Post with id ${post.id} has been deleted`)
        return callback(null, response)
    }

}