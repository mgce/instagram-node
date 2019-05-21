import "reflect-metadata";
import { ServerCredentials, Server } from "grpc";
import { PostService, commonConfig, createPostgresConnection } from '@instagram-node/common';
import { PostAppService } from './post.service';
import { PostModel } from './post.model';

const SERVER_URI = '0.0.0.0:' + commonConfig.ports.postService

//Run postgres connection
createPostgresConnection([PostModel]).then(connection => {

    const postRepository = connection.getRepository(PostModel);

    const server: Server = new Server()
    server.addService(PostService, new PostAppService(postRepository))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')

}).catch(error => {
    console.log(error)
});