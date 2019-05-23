import "reflect-metadata";
import { Column, Entity } from 'typeorm';
import { BaseEntity } from "@instagram-node/common";
import {IsEmail} from "class-validator";

@Entity()
export class UserModel extends BaseEntity{
    @Column()
    public username: string;
    @IsEmail()
    @Column()
    public emailAddress: string;
    @Column()
    public salt: string;
    @Column()
    public password: string;

    constructor(username: string, emailAddress:string, salt:string, password:string){
        super();
        this.username = username;
        this.emailAddress = emailAddress;
        this.salt = salt;
        this.password = password;
    }
}
 