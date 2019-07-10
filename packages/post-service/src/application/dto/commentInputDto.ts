import { IsInt, IsString } from "class-validator";

export class CommentInputDto{
    @IsInt()
    public postId: number;
    @IsInt()
    public userId: number;
    @IsString()
    public username: string;
    @IsString()
    public description: string;
}