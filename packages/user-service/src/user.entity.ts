import {IsEmail, MinLength} from "class-validator";
import { resources } from "./resources";


export class User {
    @MinLength(3, {
        message: resources.errors.UsernameToShort
    })
    public username: string;
    @IsEmail()
    public emailAddress: string;
    public salt: string;
    public password: string;

    constructor(username: string, emailAddress: string, salt: string, password: string) {
        this.username = username;
        this.emailAddress = emailAddress;
        this.salt = salt;
        this.password = password;

        
    }
}