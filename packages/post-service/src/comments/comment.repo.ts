import { PostCommentModel } from "./comment.model";
import { Repository, getRepository } from "typeorm";
import { PostComment } from "./comment.entity";

export class PostCommentRepository {
    private postRepository: Repository<PostCommentModel>

    constructor() {
        this.postRepository = getRepository(PostCommentModel);
    }

    public async createAndSave(entity: PostComment) : Promise<PostCommentModel>{
        let model = await this.postRepository.create(entity);
        model = await this.postRepository.save(model);
        return model;
    }
}