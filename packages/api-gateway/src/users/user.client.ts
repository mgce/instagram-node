import { UserClient as UserGrpcClient, commonConfig } from "@instagram-node/common";
import { credentials } from 'grpc';

const address = process.env.USER_SERVICE || commonConfig.host + ':' + commonConfig.ports.userService

export const UserClient = new UserGrpcClient(address, credentials.createInsecure()) 