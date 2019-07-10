import { Repository, getRepository, Like } from "typeorm";
import { PostModel } from "../models/post.model";
import { PostComment } from '../../domain/comment.entity';
import { Post } from "../../domain/post.entity";
import { IPost } from "../../interfaces/IPost";

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

    public async getForUserById(id: number, userId: number): Promise<PostModel> {
        return this.postRepository
            .createQueryBuilder()
            .where({ postId: id, userId, deleted: false })
            .getOne();
    }

    public async getAll(): Promise<PostModel[]> {
        return this.postRepository
            .createQueryBuilder()
            .where({ deleted: false })
            .getMany();
    }

    public async createAndSave(entity: Post): Promise<IPost> {
        let model = await this.postRepository.create(entity);
        model = await this.postRepository.save(model);
        return model;
    }

    public async delete(model: PostModel) {
        this.postRepository.delete(model);
    }

    public async getWithTag(tag: string) {
        return this.postRepository.createQueryBuilder().where({ deleted: false, description: Like(`%#${tag}%`) }).getMany();
    }

    public async getByUserId(userId: number) {
        return this.postRepository.createQueryBuilder().where({ deleted: false, userId }).getMany();
    }
}