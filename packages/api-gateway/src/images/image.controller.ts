import { UploadImageRequest, generateGuid } from "@instagram-node/common";
import { ImageClient } from "./image.client";
import express = require("express");
import { POST, route, before } from "awilix-router-core";
import { requestValidator } from "../middlewares/requestValidator";
import { RequestWithClaims } from "../interfaces/requestWithClaims";
import { addImageValidator } from "./image.validators";
import multer from 'multer';


@route('/image')
export class PostController {
    @POST()
    @route('/upload')
    async upload(req: RequestWithClaims, res: express.Response) {
        req.on('data', data => {
            const request = new UploadImageRequest();
            
            request.setData(data);
            request.setName(generateGuid());
            
            ImageClient.upload(request, (err, result) => {
                if (err)
                return res.send(err);
                return res.send(result.getMessage())
            });
        })
    }
}

