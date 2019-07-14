import "reflect-metadata";
import { ServerCredentials, Server } from "grpc";
import { UserService,UserFollowService, commonConfig, connectWithRetry } from '@instagram-node/common';
import { Connection } from "typeorm";
import { initializeContainer } from "./container";
import { UserAppService } from './services/user.service';
import { UserRepository } from './dataAccess/repositories/user.repo';
import { UserFollowGrpcService, UserGrpcService } from "./grpc";
import { UserFollowAppService } from "./services";
import { UserFollowModel, UserModel, UserFollowRepository } from "./dataAccess";

const SERVER_URI = '0.0.0.0:' + commonConfig.ports.userService

const initService = function initService(connection: Connection) {
    const container = initializeContainer();
    const userRepository : UserRepository = container.resolve('userRepository');
    const userFollowRepository : UserFollowRepository = container.resolve('userFollowRepository');
    const userService : UserAppService = container.resolve('userService');
    const userFollowService : UserFollowAppService = container.resolve('userFollowService');

    const server: Server = new Server()
    server.addService(UserService, new UserGrpcService(userRepository, userService, userFollowRepository))
    server.addService(UserFollowService, new UserFollowGrpcService(userFollowService))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')
}

connectWithRetry([UserModel, UserFollowModel], initService);