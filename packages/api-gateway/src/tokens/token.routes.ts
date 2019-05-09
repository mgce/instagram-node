import express = require("express");
import { AuthenticateRequest, AuthenticateResponse } from '@instagram-node/common'
import { requestValidator } from "../middlewares/requestValidator";
import { UserClient } from "../users/user.client";
import { authenticateValidator } from "./token.validators";
import { RefreshTokenModel } from "./refreshToken.model";
import { getRepository } from 'typeorm';
import { getTokens, getJwtToken } from "./refreshToken.service";

const tokenRouter = express.Router();

tokenRouter.post('/', authenticateValidator, requestValidator, async (req: express.Request, res: express.Response) => {
    const { emailAddress, password } = req.body;

    const request = new AuthenticateRequest();
    request.setEmailaddress(emailAddress);
    request.setPassword(password);

    UserClient.authenticate(request, async (err, result: AuthenticateResponse) => {
        if (err)
            return res.send(err);

        var tokens = await getTokens(result.toObject(), getRepository(RefreshTokenModel));
        if (tokens === undefined)
            res.status(400).json("Something goes wrong");

        res.json(tokens)
    })
})

tokenRouter.get('/regenerate', async (req: express.Request, res: express.Response) => {
    const { refreshToken } = req.query;

    var tokens = await getJwtToken(refreshToken, getRepository(RefreshTokenModel));
    //in future we have to get claims from user-service

    if (tokens === undefined)
        res.status(400).json("Something goes wrong");

    res.json(tokens)

})

export { tokenRouter };