import "reflect-metadata";
import { createConnection } from "typeorm";
import { UserModel } from './models/userModel';
import { UserAppService } from './services/appService';
const grpc = require( 'grpc');
import {Server} from "grpc";
import {UserService} from '@instagram-node/common';

const SERVER_URI = '0.0.0.0:5001'

//Run postgres connection
createConnection().then(connection => {

const userRepository = connection.getRepository(UserModel);
const userService = new UserAppService(userRepository);

const server = new Server()
server.addService(UserService, userService)
server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure())
server.start()
console.log('Server is running!')

}).catch(error => {
    console.log(error)
});