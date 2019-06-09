export class Post {
    public userId: number;
    public username: string;
    public imageUrl: string;
    public description: string;
    public tags: string[];

    constructor(userId: number, username: string, imageUrl: string, description:string, tags:string[]){
        this.userId = userId;
        this.username = username;
        this.imageUrl = imageUrl;
        this.description = description;
        this.tags = tags;
    }
}