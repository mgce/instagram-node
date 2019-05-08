import "reflect-metadata";
import { createConnection } from "typeorm";
import { UserModel } from './models/userModel';
import { UserAppService } from './services/appService';
import { ServerCredentials, Server } from "grpc";
import { UserService, grpcErrorHandler } from '@instagram-node/common';


const SERVER_URI = '0.0.0.0:5001'

//Run postgres connection
createConnection().then(connection => {

    const userRepository = connection.getRepository(UserModel);

    const server: Server = new Server(undefined)
    server.addService(UserService, new UserAppService(userRepository))
    server.bind(SERVER_URI, ServerCredentials.createInsecure())
    server.start()
    console.log('Server is running!')

}).catch(error => {
    console.log(error)
});