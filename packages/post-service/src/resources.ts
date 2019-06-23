export const resources = {
    errors: {
        PostNotExist:"Post not exist, or you are not an owner",
        LikeExist:"Like for user currently exist",
        LikeNotExist:"Like for user not exist",
    },
    info: {
        PostHasBeenDeleted: (id: number) => `Post with id ${id} has been deleted`,
        PostHasBeenCreated: "Post has been created",
        LikeHasBeenAdded: "Like has been added",
    }
}