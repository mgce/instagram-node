import { IImageServer,UploadImageRequest,UploadImageResponse, GrpcError, handleError } from '@instagram-node/common';
import { ServerReadableStream, sendUnaryData, ServerUnaryCall, status } from 'grpc';
import {Image} from './image.entity';
import { Repository } from 'typeorm';
import { ImageModel } from './image.model';
import { validate } from 'class-validator';

export class ImageAppService implements IImageServer{

    private imageRepository: Repository<ImageModel>

    constructor(imageRepository: Repository<ImageModel>) {
        this.imageRepository = imageRepository;
    }

    public async upload(call: ServerUnaryCall<UploadImageRequest>, callback: sendUnaryData<UploadImageResponse>) : Promise<void>{
        const request = call.request.toObject();

        const image = new Image(request.data, request.name);

        const errors = await validate(image);
        if(errors.length > 0)
            return callback(new GrpcError(status.INVALID_ARGUMENT, handleError(errors)), null)

        let entity = this.imageRepository.create(image);
        entity = await this.imageRepository.save(entity);

        const response = new UploadImageResponse();
        response.setMessage("Image has been created");
        response.setImageid(entity.id);

        callback(null, response)
    }
}