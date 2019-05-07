import { UserModel } from '../models/userModel';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../domain/user';
import {CreateUserRequest, EmptyResponse} from '@instagram-node/common'
import { IUserServer } from '@instagram-node/common/protos/models/user_grpc_pb';
import {ServerUnaryCall, sendUnaryData} from 'grpc';

export class UserAppService implements IUserServer{
    private userRepository: Repository<UserModel>

    constructor(userRepository: Repository<UserModel>){
        this.userRepository = userRepository;
    }

    public async createUser(call:ServerUnaryCall<CreateUserRequest>, callback: sendUnaryData<EmptyResponse>):Promise<void>{
        const response = new EmptyResponse();
        response.setMessage("User has been created")
        
        const requestObj = call.request.toObject();

        if(requestObj.password !== requestObj.confirmpassword)
            throw new Error("Passwords are not equal")

        const existingUser = this.userRepository.findOne({emailAddress: requestObj.emailaddress})
        if(existingUser)
            throw new Error("User with this email is exist")

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(requestObj.password, salt); 
        
        const user = new User(requestObj.username, requestObj.emailaddress, hashedPassword);

        var entity = this.userRepository.create(user);
        this.userRepository.save(entity);

        callback(null, response)
    }
}