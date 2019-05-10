import { CreateUserRequest } from "@instagram-node/common";
import { UserClient } from "./user.client";
import express = require("express");
import { POST, route, before } from "awilix-router-core";
import { createUserValidator } from "./user.validators";
import { requestValidator } from "../middlewares/requestValidator";

@route('/user')
export class UserController {
    @POST()
    @route('/')
    @before(createUserValidator)
    @before(requestValidator)
    async create(req: express.Request, res: express.Response) {
        const request: CreateUserRequest = new CreateUserRequest();
        const { username, password, confirmPassword, emailAddress } = req.body;

        request.setUsername(username);
        request.setPassword(password);
        request.setConfirmpassword(confirmPassword);
        request.setEmailaddress(emailAddress);

        UserClient.createUser(request, (err, result) => {
            if (err)
                return res.send(err);
            return res.send(result.getMessage())
        });
    }
}

