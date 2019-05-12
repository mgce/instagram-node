import "reflect-metadata";
import { createConnection } from "typeorm";
import { UserModel } from './models/user.model';
import { UserAppService } from './services/user.service';
import { ServerCredentials, Server } from "grpc";
import { UserService, commonConfig } from '@instagram-node/common';


const SERVER_URI = '0.0.0.0:' + commonConfig.ports.userService

//Run postgres connection
createConnection().then(connection => {

    const userRepository = connection.getRepository(UserModel);

    const server: Server = new Server()
    server.addService(UserService, new UserAppService(userRepository))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')

}).catch(error => {
    console.log(error)
});