import { route, before, POST } from "awilix-router-core";
import { authOnly } from "../middlewares/jwtValidator";
import { RequestWithClaims } from "../interfaces/requestWithClaims";
import express = require("express");
import { CommentClient } from "../posts/post.client";
import { sendErrorResponse } from "../helpers/sendErrorResponse";
import { ApiResponseMessage } from "../interfaces/apiResponseMessage";
import { DeleteCommentRequest } from "@instagram-node/common";

@route('/comments')
export class CommentController{
    @POST()
    @route('/:commentId')
    @before([authOnly])
    async delete(req: RequestWithClaims, res: express.Response){
        const request = new DeleteCommentRequest();
        request.setCommentid(req.params.commentId);
        request.setUserid(req.claims.userId);

        CommentClient.deleteComment(request, (err, result) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage('', true));
        })
    }
}