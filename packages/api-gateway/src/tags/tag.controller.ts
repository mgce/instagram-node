import { route, before, GET } from "awilix-router-core";
import { PostClient } from "../posts/post.client";
import { authOnly } from "../middlewares/jwtValidator";
import express = require("express");
import { RequestWithClaims } from "../interfaces/requestWithClaims";
import { sendErrorResponse } from "../helpers/sendErrorResponse";
import { ApiResponseMessage } from "../interfaces/apiResponseMessage";
import { SearchByTagResponse, SearchByTagRequest } from "@instagram-node/common";

@route('/tag')
export class TagController {
    @GET()
    @route('/:tag')
    @before([authOnly])
    async create(req: RequestWithClaims, res: express.Response){
        const request: SearchByTagRequest = new SearchByTagRequest();

        request.setUserid(req.claims.userId);
        request.setTag(req.params.tag);
        PostClient.searchByTag(request, (err, result:SearchByTagResponse) => {
            if (err)
                return sendErrorResponse(res, err);
            return res.send(new ApiResponseMessage(null, true, { posts: result.toObject().postsList }))
        });
    }
}