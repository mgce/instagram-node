import { CreateUserRequest, GrpcError, AuthenticateResponse, AuthenticateRequest, GetByIdRequest, GetByIdResponse } from '@instagram-node/common'
import { IUserServer } from '@instagram-node/common';
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';
import { EmptyResponse } from '@instagram-node/common/protos/models/common_pb';
import { resources } from '../resources';
import { UserAppService } from '../services/user.service';
import { UserRepository } from '../dataAccess/repositories/user.repo';

export class UserGrpcService implements IUserServer {
    private userRepository: UserRepository
    private userService: UserAppService

    constructor(userRepository: UserRepository, userService: UserAppService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public async create(call: ServerUnaryCall<CreateUserRequest>, callback: sendUnaryData<EmptyResponse>): Promise<void> {
        const request = call.request.toObject();

        try {
            this.userService.create({
                username: request.username,
                emailAddress: request.emailaddress,
                password: request.password,
                confirmPassword: request.confirmpassword
            });

            const response = new EmptyResponse();
            response.setMessage("User has been created")
            callback(null, response)
        } catch (err) {
            return callback(new GrpcError(status.INVALID_ARGUMENT, err), null)
        }
    }

    public async authenticate(call: ServerUnaryCall<AuthenticateRequest>, callback: sendUnaryData<AuthenticateResponse>): Promise<void> {
        const request = call.request.toObject();

        try{
            const user = await this.userService.authenticate(request.emailaddress, request.password);
            const response = new AuthenticateResponse();
            response.setUserid(user.id);
            response.setUsername(user.username);
            callback(null, response)
        }catch(err){
            return callback(new GrpcError(status.INVALID_ARGUMENT, err), null)
        }
    }

    public async getById(call: ServerUnaryCall<GetByIdRequest>, callback: sendUnaryData<GetByIdResponse>) {
        const request = call.request.toObject();

        const user = await this.userRepository.findById(request.userid);

        if (!user)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.UserDoesNotExist), null)

        const response = new GetByIdResponse();
        response.setId(user.id)
        response.setEmailaddress(user.emailAddress);
        response.setUsername(user.username);
        callback(null, response);
    }
}