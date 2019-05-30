import { ImageClient } from "./image.client";
import express = require("express");
import { POST, route, before, GET } from "awilix-router-core";
import { UploadImageRequest, UploadImageResponse, DownloadImageRequest, DownloadImageResponse } from '@instagram-node/common';
import { ServiceError } from "grpc";
import multiparty from 'multiparty';
import { Stream } from "stream";


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
            return res.send(result)
        }

        // const form = new multiparty.Form()

        // form.on('part', (part)=>{
        //     const request = new UploadImageRequest;
        //     request.setData(part as any);
        //     request.setFileformat(".png")
        //     writable.write(request);
        // })

        const writable = ImageClient.upload(callback)
        
        req.on('data', (data)=> {
            const request = new UploadImageRequest;
            request.setData(data);
            request.setFileformat(".png")
            writable.write(request);
        })

        req.on('end', ()=>{
            writable.end();
        })
    }
    @GET()
    @route('/download/:imageId')
    async download(req: express.Request, res: express.Response){
        const request = new DownloadImageRequest();
        request.setImageid(req.params.imageId);
        const img = ImageClient.download(request);

        img.on('data', (data : DownloadImageResponse)=>{
            const response = data.toObject();
            res.setHeader('Content-Type', 'image/jpeg')
            res.write(response.data);
        })

        img.on('end', ()=>{
            res.end();
        })
    }
}

