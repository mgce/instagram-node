import { RefreshTokenService } from "./tokens/refreshToken.service";
import { asClass, createContainer, AwilixContainer } from "awilix";
import { RefreshTokenRepository } from "./tokens/refreshToken.repo";

const container : AwilixContainer = createContainer({
    injectionMode: "CLASSIC"
});

container.register({
    refreshTokenRepository: asClass(RefreshTokenRepository),
    refreshTokenService: asClass(RefreshTokenService)
})

export {container}