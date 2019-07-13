import { Repository, getRepository } from "typeorm";
import { IPostLike } from "../../interfaces";
import { PostLikeModel } from "..";
import { PostLike } from "../../entity";

export class PostLikeRepository {
    private repository: Repository<PostLikeModel>

    constructor() {
        this.repository = getRepository(PostLikeModel);
    }

    public async createAndSave(entity: IPostLike): Promise<PostLike> {
        let model = await this.repository.create(entity);
        model = await this.repository.save(model);
        return model;
    }

    public async getOneForUser(postId: number, userId: number) : Promise<PostLike> {
        return await this.repository.findOne({ postId, userId, deleted: false });
    }

    public async delete(entity: PostLikeModel){
        entity.delete();
        await this.repository.save(entity);
    }

    public async likedByUser(postId: number, userId: number): Promise<boolean> {
        const postLike = await this.repository
            .createQueryBuilder('postLike')
            .where({ postId: postId, userId: userId, deleted: false })
            .getCount();
        return postLike > 0;
    }

    public async getLikesCount(postId: number): Promise<number> {
        return this.repository.createQueryBuilder().where({ postId: postId, deleted: false }).getCount();
    }
}