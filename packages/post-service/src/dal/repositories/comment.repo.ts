import { PostCommentModel } from "../models/comment.model";
import { Repository, getRepository } from "typeorm";
import { PostComment } from "../../domain/comment.entity";

export class PostCommentRepository {
    private commentRepository: Repository<PostCommentModel>

    constructor() {
        this.commentRepository = getRepository(PostCommentModel);
    }

    public async createAndSave(entity: PostComment) : Promise<PostCommentModel>{
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
}