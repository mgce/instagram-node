import { UserRepository, UserFollowingRepository } from "../dataAccess";
import { resources } from "../resources";
import { IUserFollowing } from "../interfaces";
import { UserFollowing } from "../entities";

export class UserFollowingAppService {
    private userRepository: UserRepository
    private userFollowingRepository: UserFollowingRepository

    constructor(userRepository: UserRepository, userFollowingRepository: UserFollowingRepository) {
        this.userRepository = userRepository;
        this.userFollowingRepository = userFollowingRepository;
    }

    public async follow(userId: number, userToFollowId: number) {
        await this.checkIfUsersExists(userId, userToFollowId);

        let userFollowing = await this.userFollowingRepository.get(userId, userToFollowId);

        if(userFollowing)
            throw new Error(resources.errors.FollowingExist)

        userFollowing = new UserFollowing(userId, userToFollowId);

        // check if following exists

        await this.userFollowingRepository.createAndSave(userFollowing);
    }

    public async unfollow(userId: number, followedUserId:number){
        const userFollowing = await this.userFollowingRepository.get(userId, followedUserId);

        if(userFollowing)
            throw new Error(resources.errors.FollowingNotExist)

        await this.userFollowingRepository.delete(userFollowing);
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