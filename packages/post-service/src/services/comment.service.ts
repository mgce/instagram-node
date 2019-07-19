import { PostCommentRepository } from "../dataAccess/repositories/comment.repo";
import { PostRepository } from "../dataAccess/repositories/post.repo";
import { CommentInputDto } from "../services/dto/commentInputDto";
import { resources } from "../resources";
import { validate } from "class-validator";
import { IPostComment } from "../interfaces/IPostComment";
import { handleError } from "@instagram-node/common";

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
            throw new Error(handleError(errors));

        const post = await this.postRepository.getById(input.postId)
        if(!post)
            throw new Error(resources.errors.PostNotExist)

        return await this.commentRepository.createAndSave(input);
    }

    public async delete(userId:number, commentId:number){
        if(!userId)
            throw new Error(resources.errors.UserIdIsEmpty);
        if(!commentId)
            throw new Error(resources.errors.CommentIdIsEmpty)

        const comment = await this.commentRepository.getCommentForUser(userId, commentId);
        if(!comment)
            throw new Error(resources.errors.CommentDoesNotExists);

        await this.commentRepository.delete(comment);
    }
}