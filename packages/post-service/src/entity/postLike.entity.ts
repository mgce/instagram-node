import { BaseEntity } from "@instagram-node/common";
import { IPostLike } from "../interfaces";

export class PostLike extends BaseEntity implements IPostLike{
    public postId: number;    
    public userId: number;
}