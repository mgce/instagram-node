import { CreateUserRequest, GrpcError, AuthenticateResponse, AuthenticateRequest, GetByIdRequest, GetByIdResponse, GetUserDetailsResponse } from '@instagram-node/common'
import { IUserServer } from '@instagram-node/common';
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';
import { EmptyResponse } from '@instagram-node/common/protos/models/common_pb';
import { resources } from '../resources';
import { UserAppService } from '../services/user.service';
import { UserRepository } from '../dataAccess/repositories/user.repo';
import { UserFollowRepository } from '../dataAccess';

export class UserGrpcService implements IUserServer {
    private userRepository: UserRepository
    private userService: UserAppService
    private userFollowRepository: UserFollowRepository

    constructor(userRepository: UserRepository, userService: UserAppService, userFollowRepository: UserFollowRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.userFollowRepository = userFollowRepository;
    }

    public async create(call: ServerUnaryCall<CreateUserRequest>, callback: sendUnaryData<EmptyResponse>): Promise<void> {
        const request = call.request.toObject();

        try {
            await this.userService.create({
                username: request.username,
                emailAddress: request.emailaddress,
                password: request.password,
                confirmPassword: request.confirmpassword
            });

            const response = new EmptyResponse();
            response.setMessage("User has been created")
            callback(null, response)
        } catch (err) {
            callback(new GrpcError(status.INVALID_ARGUMENT, err.message), null);
        }
    }

    public async authenticate(call: ServerUnaryCall<AuthenticateRequest>, callback: sendUnaryData<AuthenticateResponse>): Promise<void> {
        const request = call.request.toObject();

        try {
            const user = await this.userService.authenticate(request.emailaddress, request.password);
            const response = new AuthenticateResponse();
            response.setUserid(user.id);
            response.setUsername(user.username);
            callback(null, response)
        } catch (err) {
            callback(new GrpcError(status.INVALID_ARGUMENT, err.message), null);
            return;
        }
    }

    public async getById(call: ServerUnaryCall<GetByIdRequest>, callback: sendUnaryData<GetByIdResponse>) {
        const request = call.request.toObject();

        const user = await this.userRepository.findById(request.userid);

        if (!user){
            callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.UserDoesNotExist), null);
            return;
        }

        const response = new GetByIdResponse();
        response.setId(user.id)
        response.setEmailaddress(user.emailAddress);
        response.setUsername(user.username);
        callback(null, response);
    }

    public async getUserDetails(call: ServerUnaryCall<GetByIdRequest>, callback: sendUnaryData<GetUserDetailsResponse>) {
        const request = call.request.toObject();

        const user = await this.userRepository.findById(request.userid);

        if (!user){
            callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.UserDoesNotExist), null);
            return;
        }

        const followingInfo = await this.userFollowRepository.getFollowingInfo(request.userid);

        const response = new GetUserDetailsResponse();
        response.setId(user.id)
        response.setEmailaddress(user.emailAddress);
        response.setUsername(user.username);
        response.setFollowers(followingInfo.followers);
        response.setFollowing(followingInfo.following);
        callback(null, response);
    }
}