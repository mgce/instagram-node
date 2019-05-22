import { UserClient as UserGrpcClient, commonConfig } from "@instagram-node/common";
import { credentials } from 'grpc';

const host = process.env.HOST_ADDRESS || commonConfig.host

export const UserClient = new UserGrpcClient(host + ':' + commonConfig.ports.userService, credentials.createInsecure())