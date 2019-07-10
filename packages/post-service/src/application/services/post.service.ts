import { PostInputDto } from "../dto/createPostDto";
import { PostRepository } from "../../dal/repositories/post.repo";
import { PostCommentRepository } from "../../dal/repositories/comment.repo";
import { Repository } from "typeorm";
import { PostLikeModel } from "../../dal/models/postlike.model";
import { Post } from "../../domain/post.entity";
import { IPost } from "../../interfaces/IPost";
import { resources } from "../../resources";
import { validate } from "class-validator";

export class PostAppService {
    private postRepository: PostRepository
    private commentRepository: PostCommentRepository
    private postLikeRepository: Repository<PostLikeModel>

    constructor(postRepository: PostRepository,
        commentRepository: PostCommentRepository,
        postLikeRepository: Repository<PostLikeModel>) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.postLikeRepository = postLikeRepository;
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