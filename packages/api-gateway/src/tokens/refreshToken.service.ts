import jwt from 'jsonwebtoken'
import { AuthenticateResponse } from "@instagram-node/common";
import { RefreshTokenRepository } from "./refreshToken.repo";
var randtoken = require('rand-token');

export class RefreshTokenService {

    private _refreshTokenRepository: RefreshTokenRepository;
    constructor(refreshTokenRepository: RefreshTokenRepository) {
        this._refreshTokenRepository = refreshTokenRepository;
    }

    public async getTokens(claims: AuthenticateResponse.AsObject): Promise<object | undefined> {
        let refreshToken = await this._refreshTokenRepository.getActiveUserToken(claims.userid);

        if (!refreshToken) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            refreshToken = await this._refreshTokenRepository.create(randtoken.uid(256), expirationDate, claims.userid);
        }

        const secret = process.env.JWT_SECRET;
        if (secret === undefined)
            return undefined

        const token = jwt.sign(claims, secret, { expiresIn: 36000 })

        return {
            success: true,
            token: `Bearer ${token}`,
            refreshToken: refreshToken.token
        }
    }

    public async getJwtToken(refreshToken: string) : Promise<object | undefined> {
        var activeRefreshToken = this._refreshTokenRepository.exist(refreshToken);
    
        if (!activeRefreshToken)
            return undefined;
    
        const secret = process.env.JWT_SECRET;
        if (secret === undefined)
            return undefined
    
        const token = jwt.sign({ userId: activeRefreshToken }, secret, { expiresIn: 36000 })
    
        return {
            success: true,
            token: `Bearer ${token}`,
            refreshToken: refreshToken
        }
    }
}