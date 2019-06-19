import { ImageClient as ImageGrpcClient, commonConfig } from "@instagram-node/common";
import { credentials } from 'grpc';

const address = process.env.IMAGE_SERVICE || commonConfig.host + ':' + commonConfig.ports.imageService

export const ImageClient = new ImageGrpcClient(address , credentials.createInsecure())