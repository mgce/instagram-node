import { PostRepository } from "../../dal/repositories/post.repo";
import { IPost } from "../../interfaces/IPost";
import { resources } from "../../resources";
import { validate } from "class-validator";
import { PostInputDto } from "../dto/postInputDto";

export class PostAppService {
    private postRepository: PostRepository

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }
    public async create(postInput: PostInputDto): Promise<IPost> {
        const errors = await validate(postInput);
        if (errors.length > 0)
            throw new Error(errors.toString());
        return await this.postRepository.createAndSave(postInput);
    }

    public async delete(postId:number, userId:number) : Promise<void>{
        const post = await this.postRepository.getForUserById(postId, userId);

        if (!post)
            throw new Error(resources.errors.PostNotExist)

        await this.postRepository.delete(post);
    }
}