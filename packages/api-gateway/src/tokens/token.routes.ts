import express = require("express");
import { AuthenticateRequest, AuthenticateResponse } from '@instagram-node/common'
import { requestValidator } from "../middlewares/requestValidator";
import jwt from 'jsonwebtoken'
import { UserClient } from "../users/user.client";
import { authenticateValidator } from "./token.validators";
import { RefreshTokenModel } from "./refreshToken.model";
import { RefreshToken } from "./refreshToken.dto";
import { getRepository } from 'typeorm';
var randtoken = require('rand-token');

const tokenRouter = express.Router();

tokenRouter.post('/', authenticateValidator, requestValidator, function (req: express.Request, res: express.Response) {
    const { emailAddress, password } = req.body;
    const request = new AuthenticateRequest();
    request.setEmailaddress(emailAddress);
    request.setPassword(password);

    UserClient.authenticate(request, (err, result: AuthenticateResponse) => {
        if (err)
            return res.send(err);

        const secret = process.env.JWT_SECRET;
        if (secret !== undefined){
            var claims = result.toObject();
            const refreshTokenRepository = getRepository(RefreshTokenModel);

            const token = jwt.sign(claims, secret, { expiresIn: 36000 })
            //first, check if refreshToken exist
            const rt = refreshTokenRepository.createQueryBuilder().where(`expirationDate > ${new Date()}`).execute();

            //create new refresh token
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            const refreshToken : RefreshToken = {
                refreshToken: randtoken.uid(256),
                expirationDate: expirationDate,
                userId: claims.userid
            }

            const entity = refreshTokenRepository.create(refreshToken);
            refreshTokenRepository.save(entity).then(() => {
                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    refreshToken: refreshToken.refreshToken
                })
            })
        }
        else
            res.status(400).json("Something goes wrong");
    })
})

export {tokenRouter};