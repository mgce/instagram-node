import {IsEmail, MinLength, Equals, IsString} from "class-validator";
import { resources } from "../../resources";

export class CreateUserInput{
    @MinLength(3, {
        message: resources.errors.UsernameToShort
    })
    @IsString()
    public username:string;
    @IsEmail()
    public emailAddress:string;
    @IsString()
    public password:string;
    @IsString()
    public confirmPassword:string;
}