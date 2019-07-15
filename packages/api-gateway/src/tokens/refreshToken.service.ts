import jwt from 'jsonwebtoken'
import { AuthenticateResponse, logger, GetByIdRequest } from "@instagram-node/common";
import { RefreshTokenRepository } from "./refreshToken.repo";
var randtoken = require('rand-token');
import { UserClient } from "../users/user.client";

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
        if (secret === undefined) {
            logger.info("Secret key doesn't exist")
            return undefined
        };

        const token = jwt.sign(claims, secret, { expiresIn: "10h" })

        return {
            success: true,
            token: `Bearer ${token}`,
            refreshToken: refreshToken.token
        }
    }

    public async getJwtToken(refreshToken: string, callback: Function): Promise<object | undefined> {
        var activeRefreshToken = await this._refreshTokenRepository.getToken(refreshToken);

        if (!activeRefreshToken) {
            logger.info("There is no active refresh token.");
            return undefined;
        }

        const secret = process.env.JWT_SECRET;
        if (secret === undefined) {
            logger.info("Secret key doesn't exist");
            return undefined;
        }

        const request = new GetByIdRequest();
        request.setUserid(activeRefreshToken.userId)
        UserClient.getById(request, (err, result) => {
            const token = jwt.sign({ 
                userId: result.getId(),
                 username: result.getUsername() 
                }, secret, { expiresIn: "10h" })

            const tokens = {
                success: true,
                token: `Bearer ${token}`,
                refreshToken: refreshToken
            }

            callback(tokens);
        })
    }

    public async logout(userId:number){
        await this._refreshTokenRepository.deleteToken(userId)
    }
}