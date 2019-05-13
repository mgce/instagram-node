import { UploadImageRequest } from "@instagram-node/common";
import { ImageClient } from "./image.client";
import express = require("express");
import { POST, route, before } from "awilix-router-core";
import { requestValidator } from "../middlewares/requestValidator";
import { RequestWithClaims } from "../interfaces/requestWithClaims";
import { addImageValidator } from "./image.validators";

@route('/post')
export class PostController {
    @POST()
    @route('/upload')
    @before(addImageValidator)
    @before(requestValidator)
    async upload(req: RequestWithClaims, res: express.Response) {
        const request = new UploadImageRequest();
        const { data, name } = req.body;

        request.setData(data);
        request.setName(name);

        ImageClient.upload(request, (err, result) => {
            if (err)
                return res.send(err);
            return res.send(result.getMessage())
        });
    }
}

