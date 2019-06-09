import { UserModel } from './user.model';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserRequest, GrpcError, AuthenticateResponse, AuthenticateRequest, handleError, GetByIdRequest, GetByIdResponse } from '@instagram-node/common'
import { IUserServer } from '@instagram-node/common';
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';
import { EmptyResponse } from '@instagram-node/common/protos/models/common_pb';
import { resources } from './resources';
import { validate } from 'class-validator';

export class UserAppService implements IUserServer {
    private userRepository: Repository<UserModel>

    constructor(userRepository: Repository<UserModel>) {
        this.userRepository = userRepository;
    }

    public async create(call: ServerUnaryCall<CreateUserRequest>, callback: sendUnaryData<EmptyResponse>): Promise<void> {
        const request = call.request.toObject();

        const validation = await this.validateCreateUser(request, callback);
        if(validation !== null)
            return callback(validation, null);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.password, salt);

        const user = new User(request.username, request.emailaddress, salt, hashedPassword);

        const errors = await validate(user);
        if(errors.length > 0)
            return callback(new GrpcError(status.INVALID_ARGUMENT, handleError(errors)), null)

        var entity = this.userRepository.create(user);
        await this.userRepository.save(entity);
        const response = new EmptyResponse();
        response.setMessage("User has been created")
        callback(null, response)
    }

    private async validateCreateUser(request: CreateUserRequest.AsObject, callback: sendUnaryData<EmptyResponse>) {
        if(request.password === null || request.password === undefined)
            return new GrpcError(status.INVALID_ARGUMENT, resources.errors.PasswordMustHaveValue);

        if (request.password !== request.confirmpassword)
            return new GrpcError(status.INVALID_ARGUMENT, resources.errors.PasswordsAreNoEqual)

        const existingUser = await this.userRepository.findOne({ emailAddress: request.emailaddress })
        if (existingUser)
            return new GrpcError(status.INVALID_ARGUMENT, resources.errors.UserWithThisEmailExist)

        return null;
    }

    public async authenticate(call: ServerUnaryCall<AuthenticateRequest>, callback: sendUnaryData<AuthenticateResponse>): Promise<void> {
        const request = call.request.toObject();

        const user = await this.userRepository.findOne({ emailAddress: request.emailaddress });
        if (!user)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.UserWithThisEmailNotExist), null)

        const isPasswordMatching = await bcrypt.compare(request.password, user.password);
        if (!isPasswordMatching)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.PasswordIsInvalid), null)

        const response = new AuthenticateResponse();
        response.setUserid(user.id);
        response.setUsername(user.username);
        callback(null, response)
    }

    public async getById(call: ServerUnaryCall<GetByIdRequest>, callback: sendUnaryData<GetByIdResponse>){
        const request = call.request.toObject();

        const user = await this.userRepository.findOne({id: request.userid});

        if(!user)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.UserDoesNotExist), null)

        const response = new GetByIdResponse();
        response.setId(user.id)
        response.setEmailaddress(user.emailAddress);
        response.setUsername(user.username);
        callback(null, response);
    }
}