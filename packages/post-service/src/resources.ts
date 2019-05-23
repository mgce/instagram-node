export const resources = {
    errors: {
        PostNotExist:"Post not exist, or you are not an owner",
    },
    info: {
        PostHasBeenDeleted: (id: number) => `Post with id ${id} has been deleted`,
        PostHasBeenCreated: "Post has been created"
    }
}