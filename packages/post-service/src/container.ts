import { asClass, createContainer, AwilixContainer } from "awilix";
import { PostAppService, PostLikeAppService, PostCommentAppService } from "./services";
import { PostRepository, PostCommentRepository, PostLikeRepository } from "./dataAccess";

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