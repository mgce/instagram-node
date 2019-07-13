import { UserRepository, UserFollowingRepository } from "../dataAccess";
import { resources } from "../resources";
import { IUserFollowing } from "../interfaces";

export class UserFollowingAppService {
    private userRepository: UserRepository
    private userFollowingRepository: UserFollowingRepository

    constructor(userRepository: UserRepository, userFollowingRepository: UserFollowingRepository) {
        this.userRepository = userRepository;
        this.userFollowingRepository = userFollowingRepository;
    }

    public async follow(userId: number, followingUserId: number) {
        if (!userId)
            throw new Error(resources.errors.UserIdIsEmpty)

        if (!followingUserId)
            throw new Error(resources.errors.FollowingUserIdIsEmpty)

        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new Error(resources.errors.UserDoesNotExist)

        const followingUser = await this.userRepository.findById(followingUserId);
        if (!followingUser)
            throw new Error(resources.errors.FollowingUserDoesNotExist)

        const userFollowing: IUserFollowing = { userId: userId, followingUserId: followingUserId };

        await this.userFollowingRepository.createAndSave(userFollowing);
    }
}