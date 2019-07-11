import { Repository, getRepository } from "typeorm";
import { IPostLike } from "../../interfaces";
import { PostLikeModel } from "..";

export class PostLikeRepository {
    private repository: Repository<PostLikeModel>

    constructor() {
        this.repository = getRepository(PostLikeModel);
    }

    public async createAndSave(entity: IPostLike): Promise<PostLikeModel> {
        let model = await this.repository.create(entity);
        model = await this.repository.save(model);
        return model;
    }

    public async getOneForUser(postId: number, userId: number) {
        return await this.repository.findOne({ postId, userId, deleted: false });
    }

    public async update(entity: PostLikeModel){
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