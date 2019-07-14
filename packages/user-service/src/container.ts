import { asClass, createContainer, AwilixContainer } from "awilix";
import { UserFollowAppService, UserAppService } from "./services";
import { UserRepository, UserFollowRepository } from "./dataAccess";

const container : AwilixContainer = createContainer({
    injectionMode: "CLASSIC"
});


export const initializeContainer = () => {
    container.register({
        userRepository: asClass(UserRepository),
        userFollowRepository: asClass(UserFollowRepository),
        userService: asClass(UserAppService),
        userFollowService: asClass(UserFollowAppService),
    })
    return container;
}