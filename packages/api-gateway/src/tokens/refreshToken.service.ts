import { Repository, MoreThan } from "typeorm";
import { RefreshTokenModel } from "./refreshToken.model";
import { RefreshToken } from "./refreshToken.dto";
import jwt from 'jsonwebtoken'
import { AuthenticateResponse } from "@instagram-node/common";
var randtoken = require('rand-token');

export async function getTokens(claims: AuthenticateResponse.AsObject, refreshTokenRepository: Repository<RefreshTokenModel>): Promise<object | undefined> {
    let refreshToken = await getActiveRefreshToken(claims.userid, refreshTokenRepository)

    if (!refreshToken) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        refreshToken = refreshTokenRepository.create({
            token: randtoken.uid(256),
            expirationDate: expirationDate,
            userId: claims.userid
        });
        await refreshTokenRepository.save(refreshToken);
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

export async function getJwtToken(refreshToken: string, refreshTokenRepository: Repository<RefreshTokenModel>) {
    var activeRefreshToken = refreshTokenRepository
        .createQueryBuilder()
        .where({
            token: refreshToken
        })
        .getOne();

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

async function getActiveRefreshToken(userId: number, refreshTokenRepository: Repository<RefreshTokenModel>): Promise<RefreshToken | undefined> {
    return refreshTokenRepository
        .createQueryBuilder()
        .where({
            expirationDate: MoreThan(new Date()),
            userId: userId
        })
        .getOne();
}