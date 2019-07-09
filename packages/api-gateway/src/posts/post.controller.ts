import { CreatePostRequest, DeletePostRequest, GetPostsRequest, LikePostRequest, UnlikePostRequest, GetCommentsRequest, CreateCommentRequest, CommentCreatedResponse } from "@instagram-node/common";
import { PostClient, PostLikeClient, CommentClient } from "./post.client";
import express = require("express");
import { POST, route, before, DELETE, GET } from "awilix-router-core";
import { requestValidator } from "../middlewares/requestValidator";
import { RequestWithClaims } from "../interfaces/requestWithClaims";
import { createPostValidator, postIdExistInParamsValidator, postIdExistInBodyValidator } from "./post.validators";
import { ApiResponseMessage } from './../interfaces/apiResponseMessage';
import { authOnly } from "../middlewares/jwtValidator";
import { sendErrorResponse } from "../helpers/sendErrorResponse";

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
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage(result.getMessage(), true, { postId: result.getPostid() }))
        });
    }

    @GET()
    @route('/')
    @before([authOnly])
    async getPosts(req: RequestWithClaims, res: express.Response) {
        const request = new GetPostsRequest();
        request.setUserid(req.claims.userId);

        PostClient.getPosts(request, (err, result) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage('', true, { posts: result.toObject().postsList }))
        })
    }

    @GET()
    @route('/:userId')
    @before([authOnly])
    async getUserPosts(req: RequestWithClaims, res: express.Response) {
        const request = new GetPostsRequest();
        request.setUserid(req.params.userId);

        PostClient.getUserPosts(request, (err, result) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage('', true, { posts: result.toObject().postsList }))
        })
    }

    @DELETE()
    @route('/')
    @before([postIdExistInBodyValidator, requestValidator])
    async delete(req: RequestWithClaims, res: express.Response) {
        const request = new DeletePostRequest();
        const { postId } = req.body;

        request.setPostid(postId);
        request.setUserid(req.body.claims.userId);

        PostClient.delete(request, (err, result) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage(result.getMessage(), true))
        });
    }

    @POST()
    @route('/:postId/like')
    @before([authOnly, postIdExistInParamsValidator])
    async like(req: RequestWithClaims, res: express.Response) {
        const request = new LikePostRequest();
        request.setUserid(req.claims.userId);
        request.setPostid(req.params.postId);

        PostLikeClient.like(request, (err, result) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage(result.getMessage(), true))
        })
    }

    @POST()
    @route('/:postId/unlike')
    @before([authOnly, postIdExistInParamsValidator])
    async unlike(req: RequestWithClaims, res: express.Response) {
        const request = new UnlikePostRequest();
        request.setUserid(req.claims.userId);
        request.setPostid(req.params.postId);

        PostLikeClient.unlike(request, (err, result) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage(result.getMessage(), true))
        })
    }

    @GET()
    @route('/:postId/comment')
    @before([authOnly])
    async getComments(req: RequestWithClaims, res: express.Response) {
        const request = new GetCommentsRequest();
        request.setPostid(req.params.postId);

        CommentClient.getComments(request, (err, result) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage('', true,
                { postId: req.params.postId, comments: result.toObject().commentsList }))
        })
    }

    @POST()
    @route('/:postId/comment')
    @before([authOnly])
    async addComment(req: RequestWithClaims, res: express.Response) {
        const request = new CreateCommentRequest();
        request.setPostid(req.params.postId);
        request.setDescription(req.body.description)
        request.setUserid(req.claims.userId);
        request.setUsername(req.claims.username)

        CommentClient.create(request, (err: Error, result: CommentCreatedResponse) => {
            if (err)
                return sendErrorResponse(res, err);
            const response = result.toObject();
            return res.send(new ApiResponseMessage('', true, response))
        })
    }
}

