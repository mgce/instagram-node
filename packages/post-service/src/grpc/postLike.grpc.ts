import { IPostLikeServer, EmptyResponse, LikePostRequest, UnlikePostRequest, GrpcError, PostLikeService } from '@instagram-node/common';
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';
import { resources } from '../resources';
import { PostLikeAppService } from '../services/postLike.service';


export class PostLikeGrpcService implements IPostLikeServer {
    private postLikeService: PostLikeAppService


    constructor(postLikeService: PostLikeAppService) {
        this.postLikeService = postLikeService;
    }

    public async like(call: ServerUnaryCall<LikePostRequest>, callback: sendUnaryData<EmptyResponse>) {
        const data = call.request.toObject();

        try {
            await this.postLikeService.like(data.postid, data.userid);
            const response = new EmptyResponse();
            response.setMessage(resources.info.LikeHasBeenAdded);

            callback(null, response);
        } catch (err) {
            return callback(new GrpcError(status.INVALID_ARGUMENT, err), null)
        }
    }

    public async unlike(call: ServerUnaryCall<UnlikePostRequest>, callback: sendUnaryData<EmptyResponse>) {
        const data = call.request.toObject();

        try {
            await this.postLikeService.unlike(data.postid, data.userid);
            const response = new EmptyResponse();
            response.setMessage(resources.info.LikeHasBeenAdded);

            callback(null, response);
        } catch (err) {
            return callback(new GrpcError(status.INVALID_ARGUMENT, err), null)
        }
    }

}