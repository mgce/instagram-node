import { asClass, createContainer, AwilixContainer } from "awilix";
import { PostCommentRepository } from "./comments/comment.repo";
import { PostRepository } from "./post/post.repo";

const container : AwilixContainer = createContainer({
    injectionMode: "CLASSIC"
});


export const initializeContainer = () => {
    container.register({
        postRepository: asClass(PostRepository),
        commentRepository: asClass(PostCommentRepository)
    })
    return container;
}

container.register({
    postRepository: asClass(PostRepository),
    commentRepository: asClass(PostCommentRepository)
})



export {container}