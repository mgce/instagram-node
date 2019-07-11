import { CreateUserInput } from "./dto/createUserInput";
import bcrypt from 'bcryptjs';
import { validate } from "class-validator";
import { handleError } from "@instagram-node/common";
import { IUser } from "../interfaces/IUser";
import { UserRepository } from "../dataAccess/repositories/user.repo";
import { resources } from "../resources";

export class UserAppService{
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async create(input:CreateUserInput){
        const errors = await validate(input);
        if(errors.length > 0)
            throw new Error(handleError(errors))

        if(input.password === null || input.password === undefined)
            throw new Error(resources.errors.PasswordMustHaveValue)
            
        if (input.password !== input.confirmPassword)
            throw new Error(resources.errors.PasswordsAreNoEqual)
            
        const existingUser = await this.userRepository.findByEmail(input.emailAddress);
        if (existingUser)
            throw new Error(resources.errors.UserWithThisEmailExist)

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(input.password, salt);

        const user : IUser = {
            username: input.username,
            emailAddress: input.emailAddress,
            salt:salt,
            password:hashedPassword
        }

        await this.userRepository.createAndSave(user);
    }

    public async authenticate(emailAddress:string, password:string):Promise<IUser>{
        const user = await this.userRepository.findByEmail(emailAddress);
        if(!user)
            throw new Error(resources.errors.UserWithThisEmailNotExist)

        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if(!isPasswordMatching)
            throw new Error(resources.errors.PasswordIsInvalid);
        
        return user;
    }
}