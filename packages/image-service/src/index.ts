import "reflect-metadata";
import { ServerCredentials, Server } from "grpc";
import { commonConfig, ImageService, createPostgresConnection } from '@instagram-node/common';
import { ImageAppService } from "./image.service";

const SERVER_URI = '0.0.0.0:' + commonConfig.ports.imageService

const server: Server = new Server()
server.addService(ImageService, new ImageAppService())
server.bind(SERVER_URI, ServerCredentials.createInsecure())
server.start()
console.log('Server is running!')
    