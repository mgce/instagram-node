import { Repository, getRepository } from "typeorm";
import { PostModel } from "./post.model";
import { PostComment } from './../comments/comment.entity';
import { Post } from "./post.entity";

export class PostRepository {
    private postRepository: Repository<PostModel>

    constructor() {
        this.postRepository = getRepository(PostModel);
    }

    public async getById(id: number): Promise<PostModel> {
        return this.postRepository
        .createQueryBuilder()
        .where({ postId: id, deleted: false })
        .getOne();
    }

    public async getAll(): Promise<PostModel[]> {
        return this.postRepository
        .createQueryBuilder()
        .where({ deleted: false })
        .getMany();
    }

    public async createAndSave(entity: Post): Promise<PostModel> {
        let model = await this.postRepository.create(entity);
        model = await this.postRepository.save(model);
        return model;
    }

    public async delete(model: PostModel){
        this.postRepository.delete(model);
    }
}