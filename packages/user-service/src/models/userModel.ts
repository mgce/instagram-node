import "reflect-metadata";
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseEntity } from "@instagram-node/common";

@Entity()
export class UserModel extends BaseEntity{
    @Column()
    public username: string;
    @Column()
    public emailAddress: string;
    @Column()
    public password: string;

    constructor(username: string, emailAddress:string, password:string){
        super();
        this.username = username;
        this.emailAddress = emailAddress;
        this.password = password;
    }
}
 