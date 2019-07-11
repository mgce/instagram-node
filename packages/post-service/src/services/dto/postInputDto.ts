import { IsInt, IsString, MinLength } from "class-validator";

export class PostInputDto{
    @IsInt()
    userId: number;
    @IsString()
    username: string;
    @IsString()
    imageId: string;
    @IsString()
    @MinLength(1)
    description: string;
}