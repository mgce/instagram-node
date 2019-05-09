import { BaseEntity } from "@instagram-node/common";
import { Entity, Column } from "typeorm";
import { RefreshToken } from "./refreshToken.dto";

@Entity()
export class RefreshTokenModel extends BaseEntity implements RefreshToken{
    @Column()
    public token: string;
    @Column()
    public expirationDate: Date;
    @Column()
    public userId: number;

    constructor(refreshToken: string, expirationDate: Date, userId: number){
        super();
        this.token = refreshToken;
        this.expirationDate = expirationDate;
        this.userId = userId
    }
}