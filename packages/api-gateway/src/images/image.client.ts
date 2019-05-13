import { ImageClient as ImageGrpcClient, commonConfig } from "@instagram-node/common";
import { credentials } from 'grpc';

export const ImageClient = new ImageGrpcClient('0.0.0.0:' + commonConfig.ports.imageService, credentials.createInsecure())