import { PostClient as PostGrpcClient, commonConfig } from "@instagram-node/common";
import { credentials } from 'grpc';

export const PostClient = new PostGrpcClient('0.0.0.0:' + commonConfig.ports.postService, credentials.createInsecure())