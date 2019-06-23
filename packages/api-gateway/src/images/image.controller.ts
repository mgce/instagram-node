import { ImageClient } from "./image.client";
import express = require("express");
import { POST, route, before, GET } from "awilix-router-core";
import { UploadImageRequest, UploadImageResponse, DownloadImageRequest, DownloadImageResponse, logger, generateGuid } from '@instagram-node/common';
import { ServiceError } from "grpc";
import intoStream from 'into-stream';
import { authOnly } from "../middlewares/jwtValidator";
import azure from 'azure-storage';
import { ApiResponseMessage } from './../interfaces/apiResponseMessage';


import multer from 'multer';
const upload = multer({storage: multer.memoryStorage()}).single('file')

const blobService = azure.createBlobService(
    "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;");
const containerName = 'test'

@route('/image')
export class ImageController {

    @POST()
    @route('/upload')
    @before([upload])
    newupload(req: express.Request, res: express.Response){
        const blobName = generateGuid();
        const stream = intoStream(req.file.buffer);
        const streamLength = req.file.buffer.length;
        const options = {contentSettings:{contentType:req.file.mimetype}}
        blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, options, err => {
            if(err) {
                res.status(500);
                res.json(new ApiResponseMessage(err.message, false));
                return;
            }
    
            res.status(200);
            res.json(new ApiResponseMessage("Image uploaded", true, {
                imageid: blobName
            }));
        })
    }

    @GET()
    @route('/download/:imageId')
    async downloadnew(req: express.Request, res: express.Response){

        const blobName = req.params.imageId;
        const startDate = new Date();
        const expiryDate = new Date(startDate);
        expiryDate.setMinutes(startDate.getMinutes() + 500);
        startDate.setMinutes(startDate.getMinutes() - 100);

        const sharedAccessPolicy = {
            AccessPolicy: {
                Permissions: azure.BlobUtilities.SharedAccessPermissions.READ || azure.BlobUtilities.SharedAccessPermissions.LIST,
                // Start: startDate,
                Expiry: expiryDate
            }
        }
        const token = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
        const sasUrl = blobService.getUrl(containerName, blobName, token);

        res.status(200);
        res.json(new ApiResponseMessage("Image downloaded", true, {
            url: sasUrl
        }));
    }

    @POST()
    @route('/oldupload')
    @before([authOnly, upload])
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
            request.setData(data);
            request.setFileformat(mimetype)
            request.setName(originalname)
            writable.write(request);
        })


        readable.on('end', ()=>{
            writable.end();
        })

    }
    @GET()
    @route('/olddownload/:imageId')
    async download(req: express.Request, res: express.Response){
        const request = new DownloadImageRequest();
        request.setImageid(req.params.imageId);
        const img = ImageClient.download(request);

        img.on('data', (data : DownloadImageResponse)=>{
            const response = data.toObject().data;
            const buffer = Buffer.from(response as string, 'base64')
            res.setHeader('Content-Type', 'image/jpeg')
            res.setHeader('Content-Length', response.length)
            res.end(buffer);
        })

        img.on('end', ()=>{
            res.end();
        })
    }
}

