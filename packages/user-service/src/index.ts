import { getRepository } from "typeorm";
import { UserModel } from './models/user.model';
import {createContainer, asClass, Lifetime} from 'awilix';
import { UserService } from './services/appService';

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = './src/proto/user.proto'
const SERVER_URI = '0.0.0.0:5001'

const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

// we'll implement the handlers here
const userRepository = getRepository(UserModel);
const userService = new UserService(userRepository);


const server = new grpc.Server()
server.addService(protoDescriptor.UserService.service, {createUser:userService.CreateUser})
server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure())

server.start()
console.log('Server is running!')