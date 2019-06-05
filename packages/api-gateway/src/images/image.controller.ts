import { ImageClient } from "./image.client";
import express = require("express");
import { POST, route, before, GET } from "awilix-router-core";
import { UploadImageRequest, UploadImageResponse, DownloadImageRequest, DownloadImageResponse, logger } from '@instagram-node/common';
import { ServiceError } from "grpc";
import multer from 'multer';
const upload = multer({storage: multer.memoryStorage()})
import intoStream from 'into-stream';
@route('/image')
export class ImageController {
    @POST()
    @route('/upload')
    @before([upload.single('file')])
    upload(req: express.Request, res: express.Response) {
        // const {originalname, mimetype} = req.file;
        const {originalname, mimetype} = req.file;
        const callback = (err : ServiceError, result: UploadImageResponse)=>{
            if(err){
                logger.warn(err);
                return res.send(err);
            }
            return res.send(result.toObject())
        }
        const readable = intoStream(req.file.buffer);
        const writable = ImageClient.upload(callback)
        
        readable.on('data', (data)=>{
            const request = new UploadImageRequest;
            // const dataBuff = data.get('file').toString()
            request.setData(data);
            request.setFileformat(mimetype)
            request.setName(originalname)
            writable.write(request);
        })


        readable.on('end', ()=>{
            writable.end();
        })
        // const form = new multiparty.Form();

        // form.on('part', (part:FormData)=>{
        //     const request = new UploadImageRequest;
        //     request.setData(new Uint8Array(part.));
        //     request.setFileformat(".png")
        //     writable.write(request);
        //     part.resume()
        // })

        // form.on('close', ()=>{
        //     res.end();
        // })

        // form.parse(req);
        // req.on('data', (data:FormData)=> {
        //     const request = new UploadImageRequest;
        //     const dataBuff = data.get('file').toString()
        //     request.setData(dataBuff);
        //     request.setFileformat(".png")
        //     writable.write(request);
        // })

        // req.on('end', ()=>{
        //     writable.end();
        // })
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

