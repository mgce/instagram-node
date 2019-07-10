import { IPostLikeServer, EmptyResponse, LikePostRequest, UnlikePostRequest, GrpcError } from '@instagram-node/common';
import { PostLikeModel } from '../dal/models/postlike.model';
import { Repository } from 'typeorm';
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';
import { resources } from '../resources';
import { PostModel } from '../dal/models/post.model';
import { PostLike } from '../domain/postlike.entity';
import { PostRepository } from '../dal/repositories/post.repo';
import { PostLikeRepository } from '../dal/repositories/postLike.repo';


export class PostLikeGrpcService implements IPostLikeServer {
    private postLikeRepository: PostLikeRepository
    private postRepository: PostRepository


    constructor(postLikeRepository: PostLikeRepository, postRepository: PostRepository) {
        this.postLikeRepository = postLikeRepository;
        this.postRepository = postRepository;
    }

    public async like(call: ServerUnaryCall<LikePostRequest>, callback: sendUnaryData<EmptyResponse>) {
        const data = call.request.toObject();

        let postLikeModel = await this.postLikeRepository.getOneForUser(data.postid, data.userid);
        if (postLikeModel)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.LikeExist), null)

        const post = await this.getPost(data.postid);
        if (!post)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.PostNotExist), null)

        const postLike = new PostLike(data.postid, data.userid);
        const entity = this.postLikeRepository.createAndSave(postLike);

        const response = new EmptyResponse();
        response.setMessage(resources.info.LikeHasBeenAdded);

        callback(null, response);
    }

    public async unlike(call: ServerUnaryCall<UnlikePostRequest>, callback: sendUnaryData<EmptyResponse>) {
        const data = call.request.toObject();

        let postLikeModel = await this.postLikeRepository.getOneForUser(data.postid, data.userid);
        if (!postLikeModel)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.LikeNotExist), null)

        const post = await this.getPost(data.postid);
        if (!post)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.PostNotExist), null)

        postLikeModel.delete();
        await this.postLikeRepository.update(postLikeModel);

        const response = new EmptyResponse();
        response.setMessage(resources.info.LikeHasBeenAdded);

        callback(null, response);
    }

    private async getPost(postId: number) {
        return await this.postRepository.getById(postId);
    }
}