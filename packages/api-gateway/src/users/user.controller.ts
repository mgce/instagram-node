import { CreateUserRequest } from "@instagram-node/common";
import { UserClient } from "./user.client";
import express = require("express");
import { POST, route, before } from "awilix-router-core";
import { createUserValidator } from "./user.validators";
import { requestValidator } from "../middlewares/requestValidator";
import { ApiResponseMessage } from "../interfaces/apiResponseMessage";
import { sendErrorResponse } from "../helpers/sendErrorResponse";

@route('/user')
export class UserController {
    @POST()
    @route('/')
    @before([createUserValidator, requestValidator])
    async create(req: express.Request, res: express.Response) {
        const request: CreateUserRequest = new CreateUserRequest();
        const { username, password, confirmPassword, emailAddress } = req.body;

        request.setUsername(username);
        request.setPassword(password);
        request.setConfirmpassword(confirmPassword);
        request.setEmailaddress(emailAddress);

        UserClient.create(request, (err, result) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage(result.getMessage(), true))
        });
    }
}

