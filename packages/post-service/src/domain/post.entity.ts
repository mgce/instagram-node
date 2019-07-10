export class Post {
    public userId: number;
    public username: string;
    public imageId: string;
    public description: string;

    constructor(userId: number, username: string, imageId: string, description:string){
        this.userId = userId;
        this.username = username;
        this.imageId = imageId;
        this.description = description;
    }
}