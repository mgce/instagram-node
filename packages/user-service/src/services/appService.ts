import { UserModel } from '../models/userModel';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../domain/user';
import { CreateUserRequest, EmptyResponse, GrpcError, AuthenticateResponse, AuthenticateRequest} from '@instagram-node/common'
import { IUserServer } from '@instagram-node/common/protos/models/user_grpc_pb';
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';

export class UserAppService implements IUserServer {
    private userRepository: Repository<UserModel>

    constructor(userRepository: Repository<UserModel>) {
        this.userRepository = userRepository;
    }

    public async createUser(call: ServerUnaryCall<CreateUserRequest>, callback: sendUnaryData<EmptyResponse>): Promise<void> {
        const request = call.request.toObject();

        if (request.password !== request.confirmpassword)
            return callback(new GrpcError(status.INVALID_ARGUMENT, "Passwords are not equal"), null)

        const existingUser = await this.userRepository.findOne({ emailAddress: request.emailaddress })
        if (existingUser)
            return callback(new GrpcError(status.INVALID_ARGUMENT, "User with this email is exist"), null)

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.password, salt);

        const user = new User(request.username, request.emailaddress, salt, hashedPassword);

        var entity = this.userRepository.create(user);
        await this.userRepository.save(entity);

        const response = new EmptyResponse();
        response.setMessage("User has been created")
        callback(null, response)
    }

    public async authenticate(call: ServerUnaryCall<AuthenticateRequest>, callback: sendUnaryData<AuthenticateResponse>): Promise<void> {
        const request = call.request.toObject();
        const user = await this.userRepository.findOne({ emailAddress: request.emailaddress });
        if (!user)
            return callback(new GrpcError(status.INVALID_ARGUMENT, "User with this email does not exist"), null)
        const isPasswordMatching = bcrypt.compare(request.password, user.password);
        if (!isPasswordMatching)
            return callback(new GrpcError(status.INVALID_ARGUMENT, "Password is invalid"), null)

        const response = new AuthenticateResponse();
        response.setUserid(user.id);
        callback(null, response)
    }
}