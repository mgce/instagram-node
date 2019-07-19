export const resources = {
    errors: {
        PostNotExist:"Post not exist, or you are not an owner",
        LikeExist:"Like for user currently exist",
        LikeNotExist:"Like for user not exist",
        NotPostOwner:"You are not an owner of this post",
        UserIdIsEmpty:"User Id is empty",
        CommentIdIsEmpty:"Comment Id is empty",
        CommentDoesNotExists:"Comment does not exists",
    },
    info: {
        PostHasBeenDeleted: (id: number) => `Post with id ${id} has been deleted`,
        PostHasBeenCreated: "Post has been created",
        LikeHasBeenAdded: "Like has been added",
    }
}