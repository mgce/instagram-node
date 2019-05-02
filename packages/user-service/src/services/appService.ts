import { UserModel } from '../models/user.model';
import { CreateUserInput } from './inputs/createUserInput';
import { Repository, getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../domain/user';

export class UserService{

    private userRepository: Repository<UserModel>

    constructor(){
        this.userRepository = getRepository(UserModel);
    }

    public async CreateUser(input:CreateUserInput){
        if(input.password !== input.confirmPassword)
            throw new Error("Passwords are not equal")

        const existingUser = this.userRepository.findOne({emailAddress: input.emailAddress})
        if(existingUser)
            throw new Error("User with this email is exist")

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(input.password, salt); 
        
        const user = new User(input.username, input.emailAddress, hashedPassword);

        var entity = this.userRepository.create(user);
        this.userRepository.save(entity);
    }
}