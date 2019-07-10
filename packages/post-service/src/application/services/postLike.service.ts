import { PostLikeRepository } from "../../dal/repositories/postLike.repo";
import { PostRepository } from "../../dal/repositories/post.repo";
import { resources } from "../../resources";
import { IPostLike } from "../../interfaces/IPostLike";

export class PostLikeAppService{
    private postLikeRepository: PostLikeRepository
    private postRepository: PostRepository


    constructor(postLikeRepository: PostLikeRepository, postRepository: PostRepository) {
        this.postLikeRepository = postLikeRepository;
        this.postRepository = postRepository;
    }

    public async like(postId: number, userId: number) : Promise<IPostLike>{
        let postLikeModel = await this.postLikeRepository.getOneForUser(postId, userId);
        if (postLikeModel)
            throw new Error(resources.errors.LikeExist)

        const post = await this.postRepository.getById(postId);
        if (!post)
            throw new Error(resources.errors.PostNotExist)

        return await this.postLikeRepository.createAndSave({postId, userId});
    }

    public async unlike(postId: number, userId: number): Promise<void>{
        let postLikeModel = await this.postLikeRepository.getOneForUser(postId, userId);
        if (!postLikeModel)
            throw new Error(resources.errors.LikeNotExist)

        const post = await this.postRepository.getById(postId);
        if (!post)
            throw new Error(resources.errors.PostNotExist)

        postLikeModel.delete();
        await this.postLikeRepository.update(postLikeModel);
    }

}