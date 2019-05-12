import { UserClient as UserGrpcClient, commonConfig } from "@instagram-node/common";
import { credentials } from 'grpc';

export const UserClient = new UserGrpcClient('0.0.0.0:' + commonConfig.ports.postService, credentials.createInsecure())