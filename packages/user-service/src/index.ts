import "reflect-metadata";
import { UserModel } from './user.model';
import { UserAppService } from './user.service';
import { ServerCredentials, Server } from "grpc";
import { UserService, commonConfig, createPostgresConnection, connectWithRetry } from '@instagram-node/common';
import { Connection } from "typeorm";

const SERVER_URI = '0.0.0.0:' + commonConfig.ports.userService

const initService = function initService(connection: Connection) {
    const userRepository = connection.getRepository(UserModel);

    const server: Server = new Server()
    server.addService(UserService, new UserAppService(userRepository))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')
}

connectWithRetry([UserModel], initService);