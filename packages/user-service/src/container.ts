import { asClass, createContainer, AwilixContainer } from "awilix";
import { UserRepository } from './dataAccess/repositories/user.repo';
import { UserAppService } from './services/user.service';

const container : AwilixContainer = createContainer({
    injectionMode: "CLASSIC"
});


export const initializeContainer = () => {
    container.register({
        userRepository: asClass(UserRepository),
        userService: asClass(UserAppService),
    })
    return container;
}