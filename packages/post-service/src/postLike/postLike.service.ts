import { IPostLikeServer, EmptyResponse, LikePostRequest, UnlikePostRequest, GrpcError } from '@instagram-node/common';
import { PostLikeModel } from './postlike.model';
import { Repository } from 'typeorm';
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';
import { resources } from '../resources';
import { PostModel } from '../post.model';
import { PostLike } from './postlike.entity';


export class PostLikeAppService implements IPostLikeServer {
    private postLikeRepository: Repository<PostLikeModel>
    private postRepository: Repository<PostModel>


    constructor(postLikeRepository: Repository<PostLikeModel>, postRepository: Repository<PostModel>) {
        this.postLikeRepository = postLikeRepository;
        this.postRepository = postRepository;
    }

    public async like(call: ServerUnaryCall<LikePostRequest>, callback: sendUnaryData<EmptyResponse>) {
        const data = call.request.toObject();

        let postLikeModel = await this.getPostLike(data.postid, data.userid);
        if (postLikeModel)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.LikeExist), null)

        const post = await this.getPost(data.postid);
        if (!post)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.PostNotExist), null)

        const postLike = new PostLike(data.postid, data.userid);
        let entity = this.postLikeRepository.create(postLike);

        entity = await this.postLikeRepository.save(entity);

        const response = new EmptyResponse();
        response.setMessage(resources.info.LikeHasBeenAdded);

        callback(null, response);
    }

    public async unlike(call: ServerUnaryCall<UnlikePostRequest>, callback: sendUnaryData<EmptyResponse>) {
        const data = call.request.toObject();

        let postLikeModel = await this.getPostLike(data.postid, data.userid);
        if (!postLikeModel)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.LikeNotExist), null)

        const post = await this.getPost(data.postid);
        if (!post)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.PostNotExist), null)

        postLikeModel.delete();
        await this.postLikeRepository.save(postLikeModel);

        const response = new EmptyResponse();
        response.setMessage(resources.info.LikeHasBeenAdded);

        callback(null, response);
    }

    private async getPostLike(postId: number, userId: number) {
        return await this.postLikeRepository.findOne({ postId, userId, deleted: false });
    }

    private async getPost(postId: number) {
        return await this.postRepository.findOne({ id: postId });
    }
}