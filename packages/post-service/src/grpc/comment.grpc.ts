import { ICommentServer, CreateCommentRequest, CommentCreatedResponse, GrpcError, GetCommentsResponse, GetCommentsRequest, CommentDto } from '@instagram-node/common';
import { ServerUnaryCall, sendUnaryData, status } from 'grpc';
import { PostRepository } from '../dataAccess/repositories/post.repo';
import { PostCommentRepository } from '../dataAccess/repositories/comment.repo';
import { PostCommentModel } from '../dataAccess/models/comment.model';
import { PostCommentAppService } from '../services/comment.service';
import { IPostComment } from '../interfaces/IPostComment';


export class CommentGrpcService implements ICommentServer {
    private commentRepository: PostCommentRepository
    private commentService: PostCommentAppService

    constructor(commentRepository: PostCommentRepository,
        commentService: PostCommentAppService) {
        this.commentRepository = commentRepository;
        this.commentService = commentService;
    }

    public async create(call: ServerUnaryCall<CreateCommentRequest>, callback: sendUnaryData<CommentCreatedResponse>): Promise<void> {
        const data = call.request.toObject();

        try {
            const comment = await this.commentService.create({
                postId: data.postid,
                userId: data.userid,
                username: data.username,
                description: data.description
            })

            const commentDto = await this.mapCommentToDto(comment);
            const response = new CommentCreatedResponse();
            response.setComment(commentDto)

            callback(null, response);
        } catch (err) {
            return callback(new GrpcError(status.INVALID_ARGUMENT, err), null)
        }
    }

    public async getComments(call: ServerUnaryCall<GetCommentsRequest>, callback: sendUnaryData<GetCommentsResponse>): Promise<void> {
        const comments = await this.commentRepository.getForPost(call.request.getPostid());
        const commentsList = await this.mapCommentsToDto(comments);

        const response = new GetCommentsResponse();
        response.setCommentsList(commentsList);

        callback(null, response);
    }

    private async mapCommentsToDto(comments: PostCommentModel[]) {
        return await Promise.all(comments.map(comment => {
            return this.mapCommentToDto(comment);
        }));
    }

    private async mapCommentToDto(comment: IPostComment) {
        const dto = new CommentDto();
        dto.setId(comment.id);
        dto.setUserid(comment.userId);
        dto.setPostid(comment.postId);
        dto.setUsername(comment.username);
        dto.setDescription(comment.description);
        // dto.setDatecreated(mapDateToDto(comment.dateCreate));
        return dto;
    }

}