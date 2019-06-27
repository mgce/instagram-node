import { ICommentServer, CreateCommentRequest, CommentCreatedResponse, GrpcError} from '@instagram-node/common';
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';
import { PostRepository } from './../post/post.repo';
import { resources } from '../resources';
import { PostComment } from './comment.entity';
import { PostCommentRepository } from './comment.repo';


export class CommentGrpcService implements ICommentServer {
    private commentRepository: PostCommentRepository
    private postRepository: PostRepository

    constructor(postRepository: PostRepository, commentRepository:PostCommentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }
    
    public async create(call: ServerUnaryCall<CreateCommentRequest>, callback: sendUnaryData<CommentCreatedResponse>): Promise<void> {
        const request = call.request.toObject();
        
        const post = await this.postRepository.getById(request.postid)
        if(!post)
            return callback(new GrpcError(status.INVALID_ARGUMENT, resources.errors.PostNotExist), null)

        const comment = new PostComment(request.postid, request.userid, request.description);

        const model = await this.commentRepository.createAndSave(comment);

        const response = new CommentCreatedResponse();
        response.setCommentid(model.id);
        response.setPostid(model.postId);
        response.setUserid(model.userId);

        callback(null, response);
    }
}