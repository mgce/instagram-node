import "reflect-metadata";
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class UserModel{
    @PrimaryGeneratedColumn()
    public id!: string
    @Column()
    public username: string;
    @Column()
    public emailAddress: string;
    @Column()
    public password: string;

    constructor(username: string, emailAddress:string, password:string){
        this.username = username;
        this.emailAddress = emailAddress;
        this.password = password;
    }
}
 