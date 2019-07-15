import express = require("express");
import { route, GET, POST, before } from 'awilix-router-core'
import { AuthenticateRequest, AuthenticateResponse } from '@instagram-node/common';
import { UserClient } from '../users/user.client';
import { RefreshTokenService } from "./refreshToken.service";
import { requestValidator } from "../middlewares/requestValidator";
import { authenticateValidator } from "./token.validators";
import { ApiResponseMessage } from './../interfaces/apiResponseMessage';
import { authOnly } from "../middlewares/jwtValidator";
import { RequestWithClaims } from "../interfaces/requestWithClaims";

@route('/tokens')
export class TokenController {
    private _refreshTokenService: RefreshTokenService;
    constructor(refreshTokenService: RefreshTokenService) {
        this._refreshTokenService = refreshTokenService;
    }

    @POST()
    @route('/')
    @before([authenticateValidator, requestValidator])
    async getTokens(req: express.Request, res: express.Response) {
        const { emailAddress, password } = req.body;

        const request = new AuthenticateRequest();
        request.setEmailaddress(emailAddress);
        request.setPassword(password);

        UserClient.authenticate(request, async (err, result: AuthenticateResponse) => {
            if (err)
                return res.send(new ApiResponseMessage(err.message, false, err));

            const claims = result.toObject();
            const tokens = await this._refreshTokenService.getTokens(claims)
            if (tokens === undefined)
                res.status(400).json("Something goes wrong");

            const response = new ApiResponseMessage("You are logged in", true, tokens)    
            res.json(response)
        })
    }

    @POST()
    @route('/logout')
    @before([authOnly])
    async logout(req: RequestWithClaims, res: express.Response) {
        const userId = req.claims.userId;

        await this._refreshTokenService.logout(userId);
        const response = new ApiResponseMessage("You are logged out", true)    
        res.json(response)
    }

    @GET()
    @route('/:refreshToken')
    async regenerateToken(req: express.Request, res: express.Response) {
        const { refreshToken } = req.params;

        await this._refreshTokenService.getJwtToken(refreshToken, (tokens : object)=>{
            if (tokens === undefined)
            res.status(400).json("Something goes wrong");

            res.json(tokens)
        });
        //in future we have to get claims from user-service

        
    }
}