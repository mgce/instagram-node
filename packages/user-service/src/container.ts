import { asClass, createContainer, AwilixContainer } from "awilix";
import { UserFollowAppService, UserAppService } from "./services";
import { UserRepository } from "./dataAccess";

const container : AwilixContainer = createContainer({
    injectionMode: "CLASSIC"
});


export const initializeContainer = () => {
    container.register({
        userRepository: asClass(UserRepository),
        userService: asClass(UserAppService),
        userFollowService: asClass(UserFollowAppService),
    })
    return container;
}