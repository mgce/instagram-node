import "reflect-metadata";
import { createConnection } from "typeorm";
import { ServerCredentials, Server } from "grpc";
import { PostService, commonConfig } from '@instagram-node/common';
import { PostAppService } from './service/post.service';
import { PostModel } from './models/post.model';

const SERVER_URI = '0.0.0.0:' + commonConfig.ports.postService

//Run postgres connection
createConnection().then(connection => {

    const postRepository = connection.getRepository(PostModel);

    const server: Server = new Server()
    server.addService(PostService, new PostAppService(postRepository))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')

}).catch(error => {
    console.log(error)
});