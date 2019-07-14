import { IUserFollow } from "../interfaces";
import { BaseEntity } from '@instagram-node/common';

export class UserFollow extends BaseEntity implements IUserFollow {
    public userId: number;    
    public followingUserId: number;

    constructor(userId:number, followingUserId:number){
        super();
        this.userId = userId;
        this.followingUserId = followingUserId;
    }
}