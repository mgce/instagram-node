import "reflect-metadata";
import { ServerCredentials, Server } from "grpc";
import { PostService, commonConfig, connectWithRetry, PostLikeService } from '@instagram-node/common';
import { PostAppService } from './post.service';
import { PostModel } from './post.model';
import { Connection } from 'typeorm';
import { PostLikeAppService } from "./postLike/postLike.service";
import { PostLikeModel } from "./postLike/postlike.model";

const SERVER_URI = '0.0.0.0:' + commonConfig.ports.postService

const initService = function initService(connection: Connection) {
    const postRepository = connection.getRepository(PostModel);
    const postLikeRepository = connection.getRepository(PostLikeModel);

    const server: Server = new Server()
    server.addService(PostService, new PostAppService(postRepository))
    server.addService(PostLikeService, new PostLikeAppService(postLikeRepository, postRepository))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')
}

connectWithRetry([PostModel], initService);