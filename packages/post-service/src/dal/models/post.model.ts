import "reflect-metadata";
import { Column, Entity } from 'typeorm';
import { BaseEntity } from "@instagram-node/common";
import { IsNumber, IsNotEmpty } from "class-validator";
import { IPost } from "../../interfaces/IPost";

@Entity()
export class PostModel extends BaseEntity implements IPost{
    @Column()
    @IsNumber()
    @IsNotEmpty()
    public userId: number;
    @Column()
    @IsNumber()
    @IsNotEmpty()
    public username: string;
    @Column()
    @IsNotEmpty()
    public imageId: string;
    @Column()
    @IsNotEmpty()
    public description: string;

    constructor(userId: number, username: string, imageId: string, description: string) {
        super();
        this.userId = userId;
        this.username = username;
        this.imageId = imageId;
        this.description = description;
    }
}