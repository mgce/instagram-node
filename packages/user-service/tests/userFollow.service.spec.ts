import { UserRepository } from '../src/dataAccess/repositories/user.repo';
import {  UserFollowRepository } from '../src/dataAccess/repositories/userFollow.repo';
import { UserFollowAppService } from "../src/services/userFollow.service"
import { expect } from 'chai';
import { resources } from "../src/resources";
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { UserFollow } from "../src/entities";

describe('User Follow service', () => {
    // let connection: Connection;
    let userRepository: UserRepository;
    let userFollowRepository: UserFollowRepository;
    let userFollowingService: UserFollowAppService;
    const userId = 1;
    const userToFollowId = 2;
    beforeEach(async () => {
        // connection = await createTestConnection();
        userRepository = mock(UserRepository);
        userFollowRepository = mock(UserFollowRepository);
        userFollowingService = new UserFollowAppService(instance(userRepository), instance(userFollowRepository));
    })

    describe('Following the User', () => {
        it('should throw error if user id is undefined', async () => {
            try {
                await userFollowingService.follow(undefined, userToFollowId);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.UserIdIsEmpty)
            }
        })

        it('should throw error if userToFollowId id is undefined', async () => {
            try {
                await userFollowingService.follow(userId, undefined);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.FollowingUserIdIsEmpty)
            }
        })

        it('should throw error if user not exists', async () => {
            when(userRepository.findById(userId)).thenReturn(undefined);
            try {
                await userFollowingService.follow(userId, userToFollowId);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.UserDoesNotExist)
            }
        })

        it('should throw error if user to follow not exists', async () => {
            when(userRepository.findById(userId)).thenReturn(getUser());
            when(userRepository.findById(userToFollowId)).thenReturn(undefined);
            try {
                await userFollowingService.follow(userId, userToFollowId);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.FollowingUserDoesNotExist)
            }
        })

        it('should throw error if userfollowing exists', async () => {
            when(userRepository.findById(userId)).thenReturn(getUser());
            when(userRepository.findById(userToFollowId)).thenReturn(undefined);
            when(userFollowRepository.get(userId, userToFollowId)).thenReturn(getUserFollowing());
            try {
                await userFollowingService.follow(userId, userToFollowId);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.FollowingUserDoesNotExist)
            }
        })

        it('should follow user', async ()=>{
            //Arrange
            when(userRepository.findById(userId)).thenReturn(getUser());
            when(userRepository.findById(userToFollowId)).thenReturn(getFollowingUser());

            //Act
            await userFollowingService.follow(userId, userToFollowId);

            //Assert
            verify(userFollowRepository.createAndSave(anything())).once();
           
        })
    })

    describe('Unfollowing the User', ()=> {
        it('should throw error if following not exists', async ()=>{
            //Arrange
            when(userFollowRepository.get(userId, userToFollowId)).thenReturn(undefined)

            //Act
            try{
                await userFollowingService.unfollow(userId, userToFollowId);
            }catch(err){
            //Assert
                expect(err).exist;
                expect(err.message).to.be.equal(resources.errors.FollowingNotExist);
                verify(userFollowRepository.get(userId, userToFollowId)).once();
            }

        })

        it('should set following to deleted', async()=>{
            //Arrange
            when(userFollowRepository.get(userId, userToFollowId)).thenReturn()

            //Act
            await userFollowingService.unfollow(userId, userToFollowId);

            //Assert
            verify(userFollowRepository.get(userId, userToFollowId)).once();
            verify(userFollowRepository.delete(anything())).once();
        })
    })
})




async function getUser(){return {id: 1, username: "testUser", emailAddress: "test@address.pl", salt: "xyz", password: "veryStrong" }}
async function getFollowingUser(){return {id: 2, username: "testFollowingUser", emailAddress: "test@address.pl", salt: "xyz", password: "veryStrong" }}
async function getUserFollowing(){return new UserFollow(1, 2)}