import { UserModel } from '../models/user.model';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../domain/user';
import {CreateUserRequest} from '@instagram-node/common'

export class UserService{

    private userRepository: Repository<UserModel>

    constructor(userRepository: Repository<UserModel>){
        this.userRepository = userRepository;
    }

    public async CreateUser(request:CreateUserRequest){
        const requestObj = request.toObject();

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
    }
}