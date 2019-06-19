import { PostClient as PostGrpcClient, commonConfig } from "@instagram-node/common";
import { credentials } from 'grpc';

const address = process.env.POST_SERVICE || commonConfig.host + ':' + commonConfig.ports.postService

export const PostClient = new PostGrpcClient(address , credentials.createInsecure())