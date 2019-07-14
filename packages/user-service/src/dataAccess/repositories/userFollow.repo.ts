import { UserFollowModel } from "..";
import { Repository, getRepository } from "typeorm";
import { IUserFollow } from "../../interfaces";
import { UserFollow } from "../../entities";

export class UserFollowRepository {
    private repository: Repository<UserFollowModel>

    constructor() {
        this.repository = getRepository(UserFollowModel);
    }

    public async createAndSave(entity: IUserFollow):Promise<UserFollow>{
        const model = this.repository.create(entity);
        return this.repository.save(model);
    }

    public async get(userId:number, followingUserId: number):Promise<UserFollow>{
        return this.repository.findOne({userId, followingUserId});
    }

    public async delete(userFollowing:UserFollow):Promise<void>{
        userFollowing.delete();
        await this.repository.save(userFollowing);
    }

    public async getFollowingInfo(userId:number){
        const following = await this.repository.count({userId});
        const followers = await this.repository.count({followingUserId:userId})

        return {following, followers}
    }
}