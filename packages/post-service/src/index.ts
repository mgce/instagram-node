import "reflect-metadata";
import { ServerCredentials, Server } from "grpc";
import { PostService, commonConfig, connectWithRetry, PostLikeService, CommentService } from '@instagram-node/common';
import { initializeContainer } from './container';
import { PostRepository, PostCommentRepository, PostLikeRepository, PostCommentModel, PostModel, PostLikeModel } from "./dataAccess";
import { PostAppService, PostLikeAppService, PostCommentAppService } from "./services";
import { PostGrpcService, PostLikeGrpcService, CommentGrpcService } from "./grpc";

const SERVER_URI = '0.0.0.0:' + commonConfig.ports.postService

const initService = function initService() {
    const container = initializeContainer();
    const postRepository : PostRepository = container.resolve('postRepository');
    const postCommentRepository : PostCommentRepository = container.resolve('commentRepository');
    const postLikeRepository:  PostLikeRepository = container.resolve('postLikeRepository');
    const postService : PostAppService = container.resolve('postService');
    const postLikeService : PostLikeAppService = container.resolve('postLikeService');
    const commentService : PostCommentAppService = container.resolve('commentService');

    const server: Server = new Server()
    server.addService(PostService, new PostGrpcService(postRepository, postCommentRepository, postLikeRepository, postService))
    server.addService(PostLikeService, new PostLikeGrpcService(postLikeService))
    server.addService(CommentService, new CommentGrpcService(postCommentRepository, commentService))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')
}

const models = [PostCommentModel, PostModel, PostLikeModel];

connectWithRetry(models, initService);