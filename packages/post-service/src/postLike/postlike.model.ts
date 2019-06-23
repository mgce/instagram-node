import "reflect-metadata";
import { Column, Entity } from 'typeorm';
import { BaseEntity } from "@instagram-node/common";
import {IsNumber, IsNotEmpty} from "class-validator";

@Entity()
export class PostLikeModel extends BaseEntity{
    @Column()
    @IsNumber()
    @IsNotEmpty()
    public postId: number;
    @Column()
    @IsNumber()
    @IsNotEmpty()
    public userId: number;

    constructor(userId: number, postId:number){
        super();
        this.postId = postId;
        this.userId = userId;
    }
}