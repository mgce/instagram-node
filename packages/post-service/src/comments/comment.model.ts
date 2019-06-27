import "reflect-metadata";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Column } from "typeorm";
import { BaseEntity } from '@instagram-node/common';

export class PostCommentModel extends BaseEntity {
    @Column()
    @IsNumber()
    @IsNotEmpty()
    public userId: number;
    @Column()
    @IsNumber()
    @IsNotEmpty()
    public postId: number;
    @Column()
    @IsNotEmpty()
    public description: string;

    constructor(userId: number, postId: number, description:string){
        super();
        this.userId = userId;
        this.postId = postId;
        this.description = description;
    }
}