import { CreatePostRequest, DeletePostRequest, GetPostsRequest } from "@instagram-node/common";
import { PostClient } from "./post.client";
import express = require("express");
import { POST, route, before, DELETE, GET } from "awilix-router-core";
import { requestValidator } from "../middlewares/requestValidator";
import { RequestWithClaims } from "../interfaces/requestWithClaims";
import { createPostValidator, deletePostValidator } from "./post.validators";
import { ApiResponseMessage } from './../interfaces/apiResponseMessage';
import { authOnly } from "../middlewares/jwtValidator";

@route('/post')
export class PostController {
    @POST()
    @route('/')
    @before([authOnly, createPostValidator, requestValidator])
    async create(req: RequestWithClaims, res: express.Response) {
        const request: CreatePostRequest = new CreatePostRequest();
        const { description, imageId } = req.body;

        // request.setUserid(req.body.claims.userId);
        request.setUserid(req.claims.userId);
        request.setUsername(req.claims.username);
        request.setDescription(description);
        request.setImageid(imageId);

        PostClient.create(request, (err, result) => {
            if (err)
                return res.send(err);
            return res.send(new ApiResponseMessage(result.getMessage(), true, { postId: result.getPostid() }))
        });
    }

    @GET()
    @route('/')
    async getPosts(req: RequestWithClaims, res: express.Response){
        const request = new GetPostsRequest();

        PostClient.getPosts(request, (err, result)=>{
            if (err)
                return res.send(err);
            return res.send(new ApiResponseMessage('', true, { posts: result.toObject().postsList }))
        })
    }

    @DELETE()
    @route('/')
    @before([deletePostValidator, requestValidator])
    async delete(req: RequestWithClaims, res: express.Response) {
        const request = new DeletePostRequest();
        const { postId } = req.body;

        request.setPostid(postId);
        request.setUserid(req.body.claims.userId);

        PostClient.delete(request, (err, result) => {
            if (err)
                return res.send(err);
            return res.send(result.getMessage())
        });

    }
}

