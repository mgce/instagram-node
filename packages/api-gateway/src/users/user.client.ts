import { UserClient as UserGrpcClient } from "@instagram-node/common";
import { credentials } from 'grpc';

export const UserClient = new UserGrpcClient('0.0.0.0:5001', credentials.createInsecure())