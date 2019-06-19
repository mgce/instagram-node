import "reflect-metadata";
import { ServerCredentials, Server } from "grpc";
import { PostService, commonConfig, connectWithRetry } from '@instagram-node/common';
import { PostAppService } from './post.service';
import { PostModel } from './post.model';
import { Connection } from 'typeorm';

const SERVER_URI = '0.0.0.0:' + commonConfig.ports.postService

const initService = function initService(connection: Connection) {
    const postRepository = connection.getRepository(PostModel);

    const server: Server = new Server()
    server.addService(PostService, new PostAppService(postRepository))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')
}

connectWithRetry([PostModel], initService);