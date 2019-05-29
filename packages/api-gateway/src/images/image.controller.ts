import { ImageClient } from "./image.client";
import express = require("express");
import { POST, route, before } from "awilix-router-core";
import { UploadImageRequest, UploadImageResponse, DownloadImageRequest, DownloadImageResponse } from '@instagram-node/common';
import { ServiceError } from "grpc";
import multer from 'multer';
import { Stream } from "stream";
// var multer  = require('multer');
var upload = multer({
    
});

@route('/image')
export class PostController {
    @POST()
    @route('/upload')
    // @before([upload])
    upload(req: express.Request, res: express.Response) {
        // const {originalname, mimetype} = req.file;
        console.log("");
        const callback = (err : ServiceError, result: UploadImageResponse)=>{
            if(err)
            return res.send(err);
            return res.send('test')
        }

        const writable = ImageClient.upload(callback)
        
        req.on('data', (data)=> {
            const request = new UploadImageRequest;
            request.setData(data);
            request.setFileformat(".png")
            // request.setName(originalname);
            writable.write(request);
        })

        req.on('end', ()=>{
            writable.end();
        })
    }
    @POST()
    @route('/download')
    async download(req: express.Request, res: express.Response){
        const request = new DownloadImageRequest();
        request.setImageid(req.body.imageId);
        const img = ImageClient.download(request);

        img.on('data', (data : DownloadImageResponse)=>{
            res.write(data.getData());
        })
    }
}

