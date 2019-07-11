import "reflect-metadata";
import { UserModel } from './dataAccess/models/user.model';
import { UserGrpcService } from './grpc/user.grpc';
import { ServerCredentials, Server } from "grpc";
import { UserService, commonConfig, connectWithRetry } from '@instagram-node/common';
import { Connection } from "typeorm";
import { initializeContainer } from "./container";
import { UserAppService } from './services/user.service';
import { UserRepository } from './dataAccess/repositories/user.repo';

const SERVER_URI = '0.0.0.0:' + commonConfig.ports.userService

const initService = function initService(connection: Connection) {
    const container = initializeContainer();
    const userRepository : UserRepository = container.resolve('userRepository');
    const userService : UserAppService = container.resolve('userService');

    const server: Server = new Server()
    server.addService(UserService, new UserGrpcService(userRepository, userService))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')
}

connectWithRetry([UserModel], initService);