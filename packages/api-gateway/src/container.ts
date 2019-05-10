import { RefreshTokenService } from "./tokens/refreshToken.service";
import { asClass, createContainer } from "awilix";
import { RefreshTokenRepository } from "./tokens/refreshToken.repo";

const container = createContainer({
    injectionMode: "CLASSIC"
});

container.register({
    refreshTokenRepository: asClass(RefreshTokenRepository),
    refreshTokenService: asClass(RefreshTokenService)
})

export {container}