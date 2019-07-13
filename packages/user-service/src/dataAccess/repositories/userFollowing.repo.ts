import { UserFollowingModel } from "..";
import { Repository, getRepository } from "typeorm";
import { IUserFollowing } from "../../interfaces";

export class UserFollowingRepository {
    private repository: Repository<UserFollowingModel>

    constructor() {
        this.repository = getRepository(UserFollowingModel);
    }

    public async createAndSave(entity: IUserFollowing):Promise<IUserFollowing>{
        const model = this.repository.create(entity);
        return this.repository.save(model);
    }
}