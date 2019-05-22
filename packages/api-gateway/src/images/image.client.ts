import { ImageClient as ImageGrpcClient, commonConfig } from "@instagram-node/common";
import { credentials } from 'grpc';

const host = process.env.HOST_ADDRESS || commonConfig.host


export const ImageClient = new ImageGrpcClient(host + ':' + commonConfig.ports.imageService, credentials.createInsecure())