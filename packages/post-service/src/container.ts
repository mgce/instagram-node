import { asClass, createContainer, AwilixContainer } from "awilix";
import { PostCommentRepository } from "./dal/repositories/comment.repo";
import { PostRepository } from "./dal/repositories/post.repo";
import { PostAppService } from './application/services/post.service';
import { PostLikeRepository } from "./dal/repositories/postLike.repo";
import { PostLikeAppService } from "./application/services/postLike.service";
import { PostCommentAppService } from "./application/services/comment.service";

const container : AwilixContainer = createContainer({
    injectionMode: "CLASSIC"
});


export const initializeContainer = () => {
    container.register({
        postRepository: asClass(PostRepository),
        commentRepository: asClass(PostCommentRepository),
        postLikeRepository: asClass(PostLikeRepository),
        postService: asClass(PostAppService),
        postLikeService: asClass(PostLikeAppService),
        commentService: asClass(PostCommentAppService),
    })
    return container;
}

container.register({
    postRepository: asClass(PostRepository),
    commentRepository: asClass(PostCommentRepository),
    postLikeRepository: asClass(PostLikeRepository),
    postService: asClass(PostAppService),
    postLikeService: asClass(PostLikeAppService),
    commentService: asClass(PostCommentAppService)
})



export {container}