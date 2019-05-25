import { CreatePostRequest, DeletePostRequest } from "@instagram-node/common";
import { PostClient } from "./post.client";
import express = require("express");
import { POST, route, before, DELETE } from "awilix-router-core";
import { requestValidator } from "../middlewares/requestValidator";
import { RequestWithClaims } from "../interfaces/requestWithClaims";
import { createPostValidator, deletePostValidator } from "./post.validators";

@route('/post')
export class PostController {
    @POST()
    @route('/')
    @before([createPostValidator, requestValidator])
    async create(req: RequestWithClaims, res: express.Response) {
        const request: CreatePostRequest = new CreatePostRequest();
        const { description, imageUrl } = req.body;

        request.setUserid(req.body.claims.userId);
        request.setDescription(description);
        request.setImageurl(imageUrl);

        PostClient.create(request, (err, result) => {
            if (err)
                return res.send(err);
            return res.send(result.getMessage())
        });
    }

    @DELETE()
    @route('/')
    @before([deletePostValidator, requestValidator])
    async delete(req: RequestWithClaims, res: express.Response){
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

