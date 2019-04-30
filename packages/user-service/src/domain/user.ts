import { BaseEntity } from '@instagram-node/common';

export class User extends BaseEntity{
    public username: string;
    public emailAddress: string;

    constructor(username: string, emailAddress:string){
        super();
        this.username = username;
        this.emailAddress = emailAddress;
    }
}