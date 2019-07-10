import "reflect-metadata";
import { ServerCredentials, Server } from "grpc";
import { PostService, commonConfig, connectWithRetry, PostLikeService, CommentService } from '@instagram-node/common';
import { PostGrpcService } from './grpc/post.grpc';
import { PostModel } from './dal/models/post.model';
import { PostLikeGrpcService } from "./grpc/postLike.grpc";
import { PostLikeModel } from "./dal/models/postlike.model";
import { PostCommentModel } from './dal/models/comment.model';
import { CommentGrpcService } from "./grpc/comment.grpc";
import { initializeContainer } from './container';
import { PostCommentRepository } from './dal/repositories/comment.repo';
import { PostRepository } from './dal/repositories/post.repo';
import { PostAppService } from './application/services/post.service';
import { PostLikeRepository } from "./dal/repositories/postLike.repo";
import { PostLikeAppService } from "./application/services/postLike.service";
import { PostCommentAppService } from "./application/services/comment.service";

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