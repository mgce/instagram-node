import { IImageServer, UploadImageRequest, UploadImageResponse, generateGuid } from '@instagram-node/common';
import { ServerReadableStream, sendUnaryData, ServerWriteableStream } from 'grpc';
import { DownloadImageRequest, DownloadImageResponse } from './../../common/protos/models/image_pb.d';
import azure from 'azure-storage';
import { Stream } from 'stream';
const blobService = azure.createBlobService(
    "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;");

export class ImageAppService implements IImageServer {

    public async upload(call: ServerReadableStream<UploadImageRequest>, callback: sendUnaryData<UploadImageResponse>): Promise<void> {
        const fileName = generateGuid()
        const writable = blobService.createWriteStreamToBlockBlob('test', fileName, {contentSettings:{contentType:"png"}}, (err, res)=>{
            if(err)
                return callback(err, null);
            response.setMessage("Image upload failed.");
            return callback(err, response);
        });
        // call.pipe(writable)

        call.on('data', (data:UploadImageRequest)=>{
            const bytes = data.toObject().data;
            writable.write(bytes)
        })

        const response = new UploadImageResponse();
        response.setMessage("Image has been created");
        response.setImageid(fileName);
        
        writable.on('close', ()=>{
            return callback(null, response)
        })

        writable.on('error', (err)=>{
            response.setMessage("Image upload failed.");
            return callback(err, response);
        })
        
        call.on('error', (err)=> {
            response.setMessage("Image upload failed.");
            return callback(err, response);
        })
        call.on('end', ()=>{
            writable.end();
            
            response.setMessage("Image upload failed.");
            return callback(null, response);
        })
    }

    public async download(call: ServerWriteableStream<DownloadImageRequest>): Promise<void> {
        const request = call.request.toObject();
        const readStream = blobService.createReadStream('test', request.imageid.toString(), (err)=> console.log(err));
        readStream.on('data', (data)=> {
            const response = new DownloadImageResponse();
            response.setData(data);
            call.write(response)
        });
    }
}