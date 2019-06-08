import express = require("express");
import { route, GET, POST, before } from 'awilix-router-core'
import { AuthenticateRequest, AuthenticateResponse } from '@instagram-node/common';
import { UserClient } from '../users/user.client';
import { RefreshTokenService } from "./refreshToken.service";
import { requestValidator } from "../middlewares/requestValidator";
import { authenticateValidator } from "./token.validators";
import { ApiResponseMessage } from './../interfaces/apiResponseMessage';

@route('/token')
export class TokenController {
    private _refreshTokenService: RefreshTokenService;
    constructor(refreshTokenService: RefreshTokenService) {
        this._refreshTokenService = refreshTokenService;
    }

    @POST()
    @route('/')
    @before(authenticateValidator)
    @before(requestValidator)
    async getTokens(req: express.Request, res: express.Response) {
        const { emailAddress, password } = req.body;

        const request = new AuthenticateRequest();
        request.setEmailaddress(emailAddress);
        request.setPassword(password);

        UserClient.authenticate(request, async (err, result: AuthenticateResponse) => {
            if (err)
                return res.send(err);

            var tokens = await this._refreshTokenService.getTokens(result.getUserid())
            if (tokens === undefined)
                res.status(400).json("Something goes wrong");

            const response = new ApiResponseMessage("You are logged in", true, tokens)    
            res.json(response)
        })
    }

    @GET()
    @route('/:refreshToken')
    async regenerateToken(req: express.Request, res: express.Response) {
        const { refreshToken } = req.params;

        var tokens = await this._refreshTokenService.getJwtToken(refreshToken);
        //in future we have to get claims from user-service

        if (tokens === undefined)
            res.status(400).json("Something goes wrong");

        res.json(tokens)
    }
}