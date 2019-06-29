import "reflect-metadata";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity } from "typeorm";
import { BaseEntity } from '@instagram-node/common';

@Entity()
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
    @IsString()
    @IsNotEmpty()
    public username: string;
    @Column()
    @IsNotEmpty()
    public description: string;

    constructor(userId: number, postId: number, username: string, description:string){
        super();
        this.userId = userId;
        this.postId = postId;
        this.username = username;
        this.description = description;
    }
}