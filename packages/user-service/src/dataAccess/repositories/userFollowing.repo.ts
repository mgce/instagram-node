import { UserFollowingModel } from "..";
import { Repository, getRepository } from "typeorm";
import { IUserFollowing } from "../../interfaces";
import { UserFollowing } from "../../entities";

export class UserFollowingRepository {
    private repository: Repository<UserFollowingModel>

    constructor() {
        this.repository = getRepository(UserFollowingModel);
    }

    public async createAndSave(entity: IUserFollowing):Promise<UserFollowing>{
        const model = this.repository.create(entity);
        return this.repository.save(model);
    }

    public async get(userId:number, followingUserId: number):Promise<UserFollowing>{
        return this.repository.findOne({userId, followingUserId});
    }

    public async delete(userFollowing:UserFollowing):Promise<void>{
        userFollowing.delete();
        await this.repository.save(userFollowing);
    }
}