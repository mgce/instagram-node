import "reflect-metadata";
import { ServerCredentials, Server } from "grpc";
import { commonConfig, ImageService, createPostgresConnection } from '@instagram-node/common';
import { ImageModel } from "./image.model";
import { ImageAppService } from "./image.service";

const SERVER_URI = '0.0.0.0:' + commonConfig.ports.imageService

//Run postgres connection
createPostgresConnection([ImageModel]).then(connection => {
    const imageRepository = connection.getRepository(ImageModel);

    const server: Server = new Server()
    server.addService(ImageService, new ImageAppService(imageRepository))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')

}).catch(error => {
    console.log(error)
});