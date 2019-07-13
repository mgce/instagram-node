import { IUserFollowing } from "../interfaces";
import { BaseEntity } from '@instagram-node/common';

export class UserFollowing extends BaseEntity implements IUserFollowing {
    public userId: number;    
    public followingUserId: number;

    constructor(userId:number, followingUserId:number){
        super();
        this.userId = userId;
        this.followingUserId = followingUserId;
    }
}