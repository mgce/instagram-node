import { UserModel } from './user.model';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserRequest, GrpcError, AuthenticateResponse, AuthenticateRequest } from '@instagram-node/common'
import { IUserServer } from '@instagram-node/common';
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';
import { EmptyResponse } from '@instagram-node/common/protos/models/common_pb';
import { resources } from './resources';

export class UserAppService implements IUserServer {
    private userRepository: Repository<UserModel>

    constructor(userRepository: Repository<UserModel>) {
        this.userRepository = userRepository;
    }

    public async createUser(call: ServerUnaryCall<CreateUserRequest>, callback: sendUnaryData<EmptyResponse>): Promise<void> {
        const request = call.request.toObject();

        const validation = await this.validateCreateUser(request, callback);
        if(validation !== null)
            return callback(validation, null);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.password, salt);

        const user = new User(request.username, request.emailaddress, salt, hashedPassword);

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

        if (request.username === null || request.username === undefined)
            return new GrpcError(status.INVALID_ARGUMENT, resources.errors.UsernameCannotBeEmpty)

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
        callback(null, response)
    }
}