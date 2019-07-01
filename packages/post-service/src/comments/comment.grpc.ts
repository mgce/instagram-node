import { ICommentServer, CreateCommentRequest, CommentCreatedResponse, GrpcError, GetCommentsResponse, GetCommentsRequest, CommentDto} from '@instagram-node/common';
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';
import { PostRepository } from './../post/post.repo';
import { resources } from '../resources';
import { PostComment } from './comment.entity';
import { PostCommentRepository } from './comment.repo';
import { PostCommentModel } from './comment.model';
import { mapDateToDto } from '../utils';


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

        const comment = new PostComment(request.postid, request.userid, request.username, request.description);

        const model = await this.commentRepository.createAndSave(comment);

        const response = new CommentCreatedResponse();

        const dto = await this.mapCommentToDto(model);
        response.setComment(dto)

        callback(null, response);
    }

    public async getComments(call: ServerUnaryCall<GetCommentsRequest>, callback: sendUnaryData<GetCommentsResponse>): Promise<void> {
        const comments = await this.commentRepository.getForPost(call.request.getPostid());
        const commentsList = await this.mapCommentsToDto(comments);

        const response = new GetCommentsResponse();
        response.setCommentsList(commentsList);

        callback(null, response);
    }

    private async mapCommentsToDto(comments:PostCommentModel[]){
        return await Promise.all(comments.map(comment => {
            return this.mapCommentToDto(comment);
        }));
    }

    private async mapCommentToDto(comment:PostCommentModel){
            const dto = new CommentDto();
            dto.setId(comment.id);
            dto.setUserid(comment.userId);
            dto.setPostid(comment.postId);
            dto.setUsername(comment.username);
            dto.setDescription(comment.description);
            dto.setDatecreated(mapDateToDto(comment.dateCreate));
            return dto;
    }

}