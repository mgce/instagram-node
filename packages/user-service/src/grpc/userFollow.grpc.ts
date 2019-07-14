import { IUserFollowServer, UserFollowRequest, EmptyResponse, GrpcError } from '@instagram-node/common'
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';
import { UserFollowAppService } from '../services/userFollow.service';

export class UserFollowGrpcService implements IUserFollowServer {
    private userFollowService: UserFollowAppService;
    constructor(userFollowService:UserFollowAppService){
        this.userFollowService = userFollowService;
    }
    public async follow(call:ServerUnaryCall<UserFollowRequest>, callback:sendUnaryData<EmptyResponse>){
        const request = call.request.toObject()

        try{
            this.userFollowService.follow(request.userid, request.usertofollowid);
            const response = new EmptyResponse();
            response.setMessage("User followed")
            callback(null, response)
        }catch(err){
            return callback(new GrpcError(status.INVALID_ARGUMENT, err), null)
        }
    }
    public async unfollow(call:ServerUnaryCall<UserFollowRequest>, callback:sendUnaryData<EmptyResponse>){
        const request = call.request.toObject()

        try{
            this.userFollowService.unfollow(request.userid, request.usertofollowid);
            const response = new EmptyResponse();
            response.setMessage("User followed")
            callback(null, response)
        }catch(err){
            return callback(new GrpcError(status.INVALID_ARGUMENT, err), null)
        }
    }
}