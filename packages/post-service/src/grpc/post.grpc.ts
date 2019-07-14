import { IPostServer, CreatePostRequest, PostCreatedResponse, DeletePostRequest, GrpcError, GetPostsRequest, PostDto, PostsResponse } from '@instagram-node/common';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { PostModel } from '../dataAccess/models/post.model';
import { EmptyResponse } from '@instagram-node/common/protos/models/common_pb';
import { resources } from '../resources';
import { PostRepository } from '../dataAccess/repositories/post.repo';
import { PostCommentRepository } from '../dataAccess/repositories/comment.repo';
import { SearchByTagRequest } from '../../../common/protos/models/post_pb';
import { PostAppService } from '../services/post.service';
import { dateToDto } from './utils.grpc';
import { PostLikeRepository } from '../dataAccess/repositories/postLike.repo';

export class PostGrpcService implements IPostServer {
    private postRepository: PostRepository
    private commentRepository: PostCommentRepository
    private postLikeRepository: PostLikeRepository

    private postAppService: PostAppService;

    constructor(postRepository: PostRepository,
        commentRepository: PostCommentRepository,
        postLikeRepository: PostLikeRepository,
        postAppService: PostAppService) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.postLikeRepository = postLikeRepository;
        this.postAppService = postAppService;
    }

    public async create(call: ServerUnaryCall<CreatePostRequest>, callback: sendUnaryData<PostCreatedResponse>): Promise<void> {
        var postData = call.request.toObject();

        try {
            const post = await this.postAppService.create({
                userId: postData.userid,
                username: postData.username,
                imageId: postData.imageid,
                description: postData.description
            })

            const response = new PostCreatedResponse();
            response.setPostid(post.id);
            response.setMessage(resources.info.PostHasBeenCreated);
        } catch (err) {
            return callback(new GrpcError(status.INVALID_ARGUMENT, err), null)
        }
    }

    public async delete(call: ServerUnaryCall<DeletePostRequest>, callback: sendUnaryData<EmptyResponse>): Promise<void> {
        var postData = call.request.toObject();

        try {
            await this.postAppService.delete(postData.postid, postData.userid)

            const response = new EmptyResponse();
            response.setMessage(resources.info.PostHasBeenDeleted(postData.postid))
            return callback(null, response)
        } catch (err) {
            return callback(new GrpcError(status.INVALID_ARGUMENT, err), null)
        }
    }

    public async getPosts(call: ServerUnaryCall<GetPostsRequest>, callback: sendUnaryData<PostsResponse>): Promise<void> {
        const posts = await this.postRepository.getAll();

        const postsList = await this.mapPostsToDto(
            posts, 
            call.request.getUserid(), 
            );

        const response = new PostsResponse();
        response.setPostsList(postsList);

        callback(null, response);
    }

    public async searchByTag(call: ServerUnaryCall<SearchByTagRequest>, callback: sendUnaryData<PostsResponse>): Promise<void> {
        const posts = await this.postRepository.getWithTag(call.request.getTag());

        const postsList = await this.mapPostsToDto(
            posts, 
            call.request.getUserid(), 
            );

        const response = new PostsResponse();
        response.setPostsList(postsList);

        callback(null, response);
    }

    public async getUserPosts(call: ServerUnaryCall<GetPostsRequest>, callback: sendUnaryData<PostsResponse>) {
        const posts = await this.postRepository.getByUserId(call.request.getUserid());

        const postsList = await this.mapPostsToDto(
            posts, 
            call.request.getUserid(), 
            );

        const response = new PostsResponse();
        response.setPostsList(postsList);

        callback(null, response);
    }

    private async mapPostsToDto(posts: PostModel[], userId: number) {
        return await Promise.all(posts.map(async (post) => {
            const dto = new PostDto();
            dto.setId(post.id);
            dto.setAuthor(post.username);
            dto.setAuthorid(post.userId);
            dto.setDescription(post.description);
            dto.setImageid(post.imageId);
            dto.setDatecreated(dateToDto(post.dateCreate));
            const liked = await this.postLikeRepository.likedByUser(post.id, userId)
            dto.setLiked(liked);
            const likesCount = await this.postLikeRepository.getLikesCount(post.id);
            dto.setLikescount(likesCount);
            const commentsCount = await this.commentRepository.countCommentsForPost(post.id);
            dto.setCommentscount(commentsCount);
            return dto;
        }))
    }
}