import { CreateUserRequest, GetUserPostsRequest, UserFollowRequest } from "@instagram-node/common";
import { UserClient, UserFollowClient } from "./user.client";
import express = require("express");
import { POST, route, before, GET } from "awilix-router-core";
import { createUserValidator } from "./user.validators";
import { requestValidator } from "../middlewares/requestValidator";
import { ApiResponseMessage } from "../interfaces/apiResponseMessage";
import { sendErrorResponse } from "../helpers/sendErrorResponse";
import { authOnly } from "../middlewares/jwtValidator";
import { RequestWithClaims } from "../interfaces/requestWithClaims";
import { PostClient } from "../posts/post.client";

@route('/users')
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

    @GET()
    @route('/:userId/posts')
    @before([authOnly])
    async getUserPosts(req: RequestWithClaims, res: express.Response) {
        const request = new GetUserPostsRequest();
        request.setUserid(req.params.userId);

        PostClient.getUserPosts(request, (err, result) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage('', true, { posts: result.toObject().postsList }))
        })
    }

    @POST()
    @route('/:userId/follow')
    @before([authOnly])
    async follow(req:RequestWithClaims, res:express.Response){
        const request = new UserFollowRequest();
        request.setUserid(req.claims.userId);
        request.setUsertofollowid(req.params.userId)

        UserFollowClient.follow(request, (err, result) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage(result.getMessage(), true))
        });
    }

    @POST()
    @route('/:userId/unfollow')
    @before([authOnly])
    async unfollow(req:RequestWithClaims, res:express.Response){
        const request = new UserFollowRequest();
        request.setUserid(req.claims.userId);
        request.setUsertofollowid(req.params.userId)

        UserFollowClient.unfollow(request, (err, result) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage(result.getMessage(), true))
        });
    }
}

