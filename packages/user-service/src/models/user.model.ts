import  {BaseEntity}  from '@instagram-node/common';
import { Column } from 'typeorm';

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