export class PostComment {
    public postId: number;
    public userId: number;
    public description: string;

    constructor(postId: number, userId: number, description: string) {
        this.postId = postId;
        this.userId = userId;
        this.description = description;
    }
}