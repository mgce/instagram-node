import { BaseEntity } from "@instagram-node/common";
import { Entity, Column } from "typeorm";

@Entity()
export class RefreshTokenModel extends BaseEntity{
    @Column()
    public refreshToken: string;
    @Column()
    public expirationDate: Date;
    @Column()
    public userId: number;

    constructor(refreshToken: string, expirationDate: Date, userId: number){
        super();
        this.refreshToken = refreshToken;
        this.expirationDate = expirationDate;
        this.userId = userId
    }
}