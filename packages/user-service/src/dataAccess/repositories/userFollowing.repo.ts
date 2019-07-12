import { UserFollowingModel } from "..";
import { Repository, getRepository } from "typeorm";

export class UserFollowingRepository {
    private repository: Repository<UserFollowingModel>

    constructor() {
        this.repository = getRepository(UserFollowingModel);
    }
}