import { UserRepository, UserFollowingRepository } from "../dataAccess";
import { resources } from "../resources";

export class UserFollowingAppService {
    private userRepository: UserRepository
    private userFollowingRepository: UserFollowingRepository

    constructor(userRepository: UserRepository, userFollowingRepository: UserFollowingRepository) {
        this.userRepository = userRepository;
        this.userFollowingRepository = userFollowingRepository;
    }

    public async follow(userId:number, followingUserId:number){
        if(!userId)
            throw new Error(resources.errors.UserIdIsEmpty)
        if(!followingUserId)
            throw new Error(resources.errors.UserIdIsEmpty)
    }
}