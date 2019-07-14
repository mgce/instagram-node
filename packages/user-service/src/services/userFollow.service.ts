import { UserRepository, UserFollowRepository } from "../dataAccess";
import { resources } from "../resources";
import { UserFollow } from "../entities";

export class UserFollowAppService {
    private userRepository: UserRepository
    private userFollowRepository: UserFollowRepository

    constructor(userRepository: UserRepository, userFollowRepository: UserFollowRepository) {
        this.userRepository = userRepository;
        this.userFollowRepository = userFollowRepository;
    }

    public async follow(userId: number, userToFollowId: number) {
        await this.checkIfUsersExists(userId, userToFollowId);

        let userFollowing = await this.userFollowRepository.get(userId, userToFollowId);

        if(userFollowing)
            throw new Error(resources.errors.FollowingExist)

        userFollowing = new UserFollow(userId, userToFollowId);

        await this.userFollowRepository.createAndSave(userFollowing);
    }

    public async unfollow(userId: number, followedUserId:number){
        const userFollowing = await this.userFollowRepository.get(userId, followedUserId);

        if(userFollowing)
            throw new Error(resources.errors.FollowingNotExist)

        await this.userFollowRepository.delete(userFollowing);
    }   

    private async checkIfUsersExists(userId: number, userToFollowId: number) {
        if (!userId)
            throw new Error(resources.errors.UserIdIsEmpty)

        if (!userToFollowId)
            throw new Error(resources.errors.FollowingUserIdIsEmpty)

        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new Error(resources.errors.UserDoesNotExist)

        const followingUser = await this.userRepository.findById(userToFollowId);
        if (!followingUser)
            throw new Error(resources.errors.FollowingUserDoesNotExist)
    }
}