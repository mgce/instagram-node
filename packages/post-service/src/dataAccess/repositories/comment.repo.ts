import { Repository, getRepository } from "typeorm";
import { PostCommentModel } from "..";
import { CommentInputDto } from "../../services/dto/commentInputDto";

export class PostCommentRepository {
    private commentRepository: Repository<PostCommentModel>

    constructor() {
        this.commentRepository = getRepository(PostCommentModel);
    }

    public async createAndSave(entity: CommentInputDto) : Promise<PostCommentModel>{
        let model = await this.commentRepository.create(entity);
        model = await this.commentRepository.save(model);
        return model;
    }

    public async getForPost(postId: number) : Promise<PostCommentModel[]>{
        return this.commentRepository.createQueryBuilder().where({postId:postId, deleted: false}).getMany();
    }

    public async countCommentsForPost(postId: number) : Promise<number>{
        return this.commentRepository.createQueryBuilder().where({postId:postId, deleted: false}).getCount();
    }

    public async getCommentForUser(userId:number, commentId:number) : Promise<PostCommentModel>{
        return this.commentRepository
            .createQueryBuilder()
            .where({id:commentId,userId, deleted: false})
            .getOne();
    }

    public async delete(model:PostCommentModel){
        await this.commentRepository.delete(model);
    }
}