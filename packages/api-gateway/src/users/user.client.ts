import { UserClient as UserGrpcClient, UserFollowClient as UserFollowGrpcClient, commonConfig } from "@instagram-node/common";
import { credentials } from 'grpc';

const address = process.env.USER_SERVICE || commonConfig.host + ':' + commonConfig.ports.userService

export const UserClient = new UserGrpcClient(address, credentials.createInsecure()) 
export const UserFollowClient = new UserFollowGrpcClient(address, credentials.createInsecure()) 