export class PostComment {
    public postId: number;
    public userId: number;
    public username: string;
    public description: string;

    constructor(postId: number, userId: number, username:string, description: string) {
        this.postId = postId;
        this.userId = userId;
        this.username = username;
        this.description = description;
    }
}