import jwt from 'jsonwebtoken'
import { AuthenticateResponse, logger } from "@instagram-node/common";
import { RefreshTokenRepository } from "./refreshToken.repo";
var randtoken = require('rand-token');

export class RefreshTokenService {

    private _refreshTokenRepository: RefreshTokenRepository;
    constructor(refreshTokenRepository: RefreshTokenRepository) {
        this._refreshTokenRepository = refreshTokenRepository;
    }

    public async getTokens(userId: number): Promise<object | undefined> {
        let refreshToken = await this._refreshTokenRepository.getActiveUserToken(userId);

        if (!refreshToken) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            refreshToken = await this._refreshTokenRepository.create(randtoken.uid(256), expirationDate, userId);
        }

        const secret = process.env.JWT_SECRET;
        if (secret === undefined){
            logger.info("Secret key doesn't exist")
            return undefined
        }

        const token = jwt.sign({userId}, secret, { expiresIn: 36000 })

        return {
            success: true,
            token: `Bearer ${token}`,
            refreshToken: refreshToken.token
        }
    }

    public async getJwtToken(refreshToken: string) : Promise<object | undefined> {
        var activeRefreshToken = this._refreshTokenRepository.exist(refreshToken);
    
        if (!activeRefreshToken){
            logger.info("There is no active refresh token.")
            return undefined;
        }
    
        const secret = process.env.JWT_SECRET;
        if (secret === undefined){
            logger.info("Secret key doesn't exist")
            return undefined
        }
    
        const token = jwt.sign({ userId: activeRefreshToken }, secret, { expiresIn: 36000 })
    
        return {
            success: true,
            token: `Bearer ${token}`,
            refreshToken: refreshToken
        }
    }
}