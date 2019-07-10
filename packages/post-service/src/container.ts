import { asClass, createContainer, AwilixContainer } from "awilix";
import { PostCommentRepository } from "./dal/repositories/comment.repo";
import { PostRepository } from "./dal/repositories/post.repo";
import { PostAppService } from './application/services/post.service';
import { PostLikeRepository } from "./dal/repositories/postLike.repo";

const container : AwilixContainer = createContainer({
    injectionMode: "CLASSIC"
});


export const initializeContainer = () => {
    container.register({
        postRepository: asClass(PostRepository),
        commentRepository: asClass(PostCommentRepository),
        postLikeRepository: asClass(PostLikeRepository),
        postService: asClass(PostAppService)
    })
    return container;
}

container.register({
    postRepository: asClass(PostRepository),
    commentRepository: asClass(PostCommentRepository),
    postLikeRepository: asClass(PostLikeRepository),
    postService: asClass(PostAppService)
})



export {container}