import { PostCommentRepository } from "../dataAccess/repositories/comment.repo";
import { PostRepository } from "../dataAccess/repositories/post.repo";
import { CommentInputDto } from "../services/dto/commentInputDto";
import { resources } from "../resources";
import { validate } from "class-validator";
import { IPostComment } from "../interfaces/IPostComment";

export class PostCommentAppService {
    private commentRepository: PostCommentRepository
    private postRepository: PostRepository

    constructor(postRepository: PostRepository, commentRepository:PostCommentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    public async create(input:CommentInputDto) : Promise<IPostComment>{
        const errors = await validate(input);
        if (errors.length > 0)
            throw new Error(errors.toString());

        const post = await this.postRepository.getById(input.postId)
        if(!post)
            throw new Error(resources.errors.PostNotExist)

        return await this.commentRepository.createAndSave(input);
    }
}