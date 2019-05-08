import { UserModel } from '../models/userModel';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../domain/user';
import {CreateUserRequest, EmptyResponse, GrpcError} from '@instagram-node/common'
import { IUserServer } from '@instagram-node/common/protos/models/user_grpc_pb';
import {ServerUnaryCall, sendUnaryData, status} from 'grpc';

export class UserAppService implements IUserServer{
    private userRepository: Repository<UserModel>

    constructor(userRepository: Repository<UserModel>){
        this.userRepository = userRepository;
    }

    public async createUser(call:ServerUnaryCall<CreateUserRequest>, callback: sendUnaryData<EmptyResponse>):Promise<void>{
        let requestObj = call.request.toObject();
        const response = new EmptyResponse();
        response.setMessage("User has been created")
        

        if(requestObj.password !== requestObj.confirmpassword)
            return callback(new GrpcError(status.INVALID_ARGUMENT, "Passwords are not equal"), null) 

        const existingUser = await this.userRepository.findOne({emailAddress: requestObj.emailaddress})
        if(existingUser)
            return callback(new GrpcError(status.INVALID_ARGUMENT, "User with this email is exist"), null) 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(requestObj.password, salt); 
       
        const user = new User(requestObj.username, requestObj.emailaddress, hashedPassword);

        var entity = this.userRepository.create(user);
        await this.userRepository.save(entity);

        callback(null, response)
    }
}