import { 
    PostClient as PostGrpcClient, 
    PostLikeClient as PostLikeGrpcClient, 
    CommentClient as CommentGrpcClient, 
    commonConfig 
} from "@instagram-node/common";
import { credentials } from 'grpc';

const address = process.env.POST_SERVICE || commonConfig.host + ':' + commonConfig.ports.postService

export const PostClient = new PostGrpcClient(address , credentials.createInsecure())
export const PostLikeClient = new PostLikeGrpcClient(address , credentials.createInsecure())
export const CommentClient = new CommentGrpcClient(address , credentials.createInsecure())