import { createTestConnection } from "./utils/createTestConnection";
import { Connection } from "typeorm";
import { UserRepository } from './../src/dataAccess/repositories/user.repo';
import { UserFollowingRepository } from './../src/dataAccess/repositories/userFollowing.repo';
import { UserFollowingAppService } from "../src/services/userFollowing.service"
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import { resources } from "../src/resources";
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { IUser, IUserFollowing } from "../src/interfaces";
import { UserFollowing } from "../src/entities";

describe('User Following service', () => {
    // let connection: Connection;
    let userRepository: UserRepository;
    let userFollowingRepository: UserFollowingRepository;
    let userFollowingService: UserFollowingAppService;
    const userId = 1;
    const userToFollowId = 2;
    beforeEach(async () => {
        // connection = await createTestConnection();
        userRepository = mock(UserRepository);
        userFollowingRepository = mock(UserFollowingRepository);
        userFollowingService = new UserFollowingAppService(instance(userRepository), instance(userFollowingRepository));
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
            when(userFollowingRepository.get(userId, userToFollowId)).thenReturn(getUserFollowing());
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
            verify(userFollowingRepository.createAndSave(anything())).once();
           
        })
    })

    describe('Unfollowing the User', ()=> {
        it('should throw error if following not exists', async ()=>{
            //Arrange
            when(userFollowingRepository.get(userId, userToFollowId)).thenReturn(undefined)

            //Act
            try{
                await userFollowingService.unfollow(userId, userToFollowId);
            }catch(err){
            //Assert
                expect(err).exist;
                expect(err.message).to.be.equal(resources.errors.FollowingNotExist);
                verify(userFollowingRepository.get(userId, userToFollowId)).once();
            }

        })

        it('should set following to deleted', async()=>{
            //Arrange
            when(userFollowingRepository.get(userId, userToFollowId)).thenReturn()

            //Act
            await userFollowingService.unfollow(userId, userToFollowId);

            //Assert
            verify(userFollowingRepository.get(userId, userToFollowId)).once();
            verify(userFollowingRepository.delete(anything())).once();
        })
    })
})




async function getUser(){return {id: 1, username: "testUser", emailAddress: "test@address.pl", salt: "xyz", password: "veryStrong" }}
async function getFollowingUser(){return {id: 2, username: "testFollowingUser", emailAddress: "test@address.pl", salt: "xyz", password: "veryStrong" }}
async function getUserFollowing(){return new UserFollowing(1, 2)}