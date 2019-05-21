export class Post {
    public userId: number;
    public imageUrl: string;
    public description: string;
    public tags: string[];

    constructor(userId: number, imageUrl: string, description:string, tags:string[]){
        this.userId = userId;
        this.imageUrl = imageUrl;
        this.description = description;
        this.tags = tags;
    }
}