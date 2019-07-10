export class PostLike {
    public postId: number;
    public userId: number;

    constructor(postId: number, userId: number) {
        this.postId = postId;
        this.userId = userId;
    }
}