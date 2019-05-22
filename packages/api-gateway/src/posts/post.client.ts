import { PostClient as PostGrpcClient, commonConfig } from "@instagram-node/common";
import { credentials } from 'grpc';

const host = process.env.HOST_ADDRESS || commonConfig.host

export const PostClient = new PostGrpcClient(host + ':' + commonConfig.ports.postService, credentials.createInsecure())