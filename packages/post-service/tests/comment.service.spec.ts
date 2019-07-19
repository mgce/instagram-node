import {PostCommentAppService} from '../src/services/comment.service'
import { PostCommentRepository, PostRepository } from '../src/dataAccess';
import { mock, when, verify, anything, notNull } from 'ts-mockito';
import { expect } from 'chai';
import { resources } from '../src/resources';
import { PostCommentModel } from './../src/dataAccess/models/comment.model';

describe('Comment Service', ()=>{
    let commentRepository: PostCommentRepository;
    let postRepository: PostRepository;
    let postCommentAppService: PostCommentAppService;
    const userId = 1;
    const commentId = 1;
    
    beforeEach(async()=>{
        commentRepository = mock(PostCommentRepository);
        postRepository = mock(PostRepository);
        postCommentAppService = new PostCommentAppService(postRepository, commentRepository);
    })

    describe('Delete User', ()=>{
        it('should throw error if user id is undefined', async ()=>{
            try {
                await postCommentAppService.delete(undefined, commentId);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.UserIdIsEmpty)
            }
        })

        it('should throw error if comment id is undefined', async ()=>{
            try {
                await postCommentAppService.delete(userId, undefined);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.CommentIdIsEmpty)
            }
        })

        it('should throw error if comment repository return undefined', async ()=>{
            when(commentRepository.getCommentForUser(userId, commentId)).thenReturn(undefined);
            try {
                await postCommentAppService.delete(userId, commentId);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.CommentDoesNotExists)
            }
        })

        it('should call comment repository method delete', async ()=>{
            //Arrange
            when(commentRepository.getCommentForUser(userId, commentId)).thenReturn(getPostComment());
            
            //Act
            await postCommentAppService.delete(userId, commentId);
            
            //Assert
            verify(commentRepository.delete(anything())).once();
        })
    })
})

async function getPostComment(){return new PostCommentModel(1, 1, "", "")}
