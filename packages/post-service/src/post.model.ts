import "reflect-metadata";
import { Column, Entity } from 'typeorm';
import { BaseEntity } from "@instagram-node/common";
import {IsNumber, IsNotEmpty} from "class-validator";

@Entity()
export class PostModel extends BaseEntity{
    @Column()
    @IsNumber()
    @IsNotEmpty()
    public userId: number;
    @Column()
    @IsNotEmpty()
    public imageUrl: string;
    @Column()
    @IsNotEmpty()
    public description: string;

    constructor(userId: number, imageUrl:string, description:string){
        super();
        this.userId = userId;
        this.imageUrl = imageUrl;
        this.description = description;
    }
}