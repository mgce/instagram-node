import "reflect-metadata";
import { ServerCredentials, Server } from "grpc";
import { PostService, commonConfig, connectWithRetry, PostLikeService, CommentService } from '@instagram-node/common';
import { PostGrpcService } from './post/post.grpc';
import { PostModel } from './post/post.model';
import { Connection } from 'typeorm';
import { PostLikeGrpcService } from "./postLike/postLike.grpc";
import { PostLikeModel } from "./postLike/postlike.model";
import { PostCommentModel } from './comments/comment.model';
import { CommentGrpcService } from "./comments/comment.grpc";
import { initializeContainer } from './container';
import { PostCommentRepository } from './comments/comment.repo';

const SERVER_URI = '0.0.0.0:' + commonConfig.ports.postService

const initService = function initService(connection: Connection) {
    const container = initializeContainer();
    const postRepository = connection.getRepository(PostModel);
    const postLikeRepository = connection.getRepository(PostLikeModel);

    const server: Server = new Server()
    server.addService(PostService, new PostGrpcService(container.resolve('postRepository'), postLikeRepository))
    server.addService(PostLikeService, new PostLikeGrpcService(postLikeRepository, postRepository))
    // server.addService(CommentService, new CommentGrpcService(container.resolve('postRepository'), new PostCommentRepository))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')
}

const models = [PostModel, PostCommentModel, PostLikeModel];
console.log(models);

connectWithRetry([], initService);