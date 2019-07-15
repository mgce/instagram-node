import { Repository, getRepository, MoreThan } from "typeorm";
import { RefreshTokenModel } from "./refreshToken.model";
import { RefreshToken } from "./refreshToken.dto";

export class RefreshTokenRepository {
    private repository: Repository<RefreshTokenModel>

    constructor() {
        this.repository = getRepository(RefreshTokenModel);
    }

    public async getToken(token: string): Promise<RefreshToken | undefined> {
        return this.repository
            .createQueryBuilder()
            .where({ token })
            .getOne();
    }

    public async getActiveUserToken(userId: number): Promise<RefreshToken | undefined> {
        return this.repository
            .createQueryBuilder()
            .where({
                expirationDate: MoreThan(new Date()),
                userId: userId
            })
            .getOne();
    }

    public async create(token: any, expirationDate: Date, userId: number): Promise<RefreshToken> {
        const refreshToken = this.repository.create({
            token,
            expirationDate,
            userId,
        });
        await this.repository.save(refreshToken);
        return refreshToken;
    }

    public async exist(token: any): Promise<boolean> {
        var tokenCount = await this.repository
            .createQueryBuilder()
            .where({
                token
            })
            .getCount();

        return tokenCount !== 0
    }

    public async deleteToken(userId:number){
        await this.repository.delete({userId});
    }
}