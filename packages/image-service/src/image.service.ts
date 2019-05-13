import { IImageServer,UploadImageRequest,UploadImageResponse } from '@instagram-node/common';
import { ServerReadableStream, sendUnaryData, ServerUnaryCall } from 'grpc';
import {Image} from './image.interface';
import { Repository } from 'typeorm';
import { ImageModel } from './image.model';

export class ImageAppService implements IImageServer{

    private imageRepository: Repository<ImageModel>

    constructor(imageRepository: Repository<ImageModel>) {
        this.imageRepository = imageRepository;
    }

    public async upload(call: ServerUnaryCall<UploadImageRequest>, callback: sendUnaryData<UploadImageResponse>) : Promise<void>{
        const request = call.request.toObject();
        const image : Image = {
            data: request.data,
            name: request.name
        }
        let entity = this.imageRepository.create(image);
        entity = await this.imageRepository.save(entity);

        const response = new UploadImageResponse();
        response.setMessage("Image has been created");
        response.setImageid(entity.id);

        callback(null, response)
    }
}