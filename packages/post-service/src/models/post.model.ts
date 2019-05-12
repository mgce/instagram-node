import "reflect-metadata";
import { Column, Entity } from 'typeorm';
import { BaseEntity } from "@instagram-node/common";

@Entity()
export class PostModel extends BaseEntity{
    @Column()
    public userId: number;
    @Column()
    public imageUrl: string;
    @Column()
    public description: string;
    @Column()
    public tags: string[];

    constructor(userId: number, imageUrl:string, description:string, tags:string[]){
        super();
        this.userId = userId;
        this.imageUrl = imageUrl;
        this.description = description;
        this.tags = tags;
    }
}