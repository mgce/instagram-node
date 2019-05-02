import { BaseEntity } from '@instagram-node/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class AccountModel extends BaseEntity{
    @Column()
    public emailAddress:string;
    @Column()
    public password: string;

    constructor(emailAddress:string, password:string){
        super();
        this.emailAddress = emailAddress;
        this.password = password;
    }
}