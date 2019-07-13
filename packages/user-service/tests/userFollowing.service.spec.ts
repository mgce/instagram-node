import { createTestConnection } from "./utils/createTestConnection";
import { Connection } from "typeorm";
import { UserRepository } from './../src/dataAccess/repositories/user.repo';
import { UserFollowingRepository } from './../src/dataAccess/repositories/userFollowing.repo';
import { UserFollowingAppService } from "../src/services/userFollowing.service"
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import { resources } from "../src/resources";
import { mock, instance, when, verify } from 'ts-mockito';
import { IUser, IUserFollowing } from "../src/interfaces";

describe('User Following service', () => {
    // let connection: Connection;
    let userRepository: UserRepository;
    let userFollowingRepository: UserFollowingRepository;
    let userFollowingService: UserFollowingAppService;
    beforeEach(async () => {
        // connection = await createTestConnection();
        userRepository = mock(UserRepository);
        userFollowingRepository = mock(UserFollowingRepository);
        userFollowingService = new UserFollowingAppService(instance(userRepository), instance(userFollowingRepository));
    })

    describe('create a following for user', () => {
        it('should throw error if user id is undefined', async () => {
            const params = getFollowParams();
            try {
                await userFollowingService.follow(undefined, params.followingUserId);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.UserIdIsEmpty)
            }
        })

        it('should throw error if userFollowingId id is undefined', async () => {
            const params = getFollowParams();
            try {
                await userFollowingService.follow(params.userId, undefined);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.FollowingUserIdIsEmpty)
            }
        })

        it('should throw error if user not exists', async () => {
            const params = getFollowParams();
            when(userRepository.findById(params.userId)).thenReturn(undefined);
            try {
                await userFollowingService.follow(params.userId, params.followingUserId);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.UserDoesNotExist)
            }
        })

        it('should throw error if user not exists', async () => {
            const params = getFollowParams();
            when(userRepository.findById(params.userId)).thenReturn(getUser());
            when(userRepository.findById(params.followingUserId)).thenReturn(undefined);
            try {
                await userFollowingService.follow(params.userId, params.followingUserId);
            } catch (err) {
                expect(err).to.be.not.null;
                expect(err.message).to.be.equal(resources.errors.FollowingUserDoesNotExist)
            }
        })

        it('should follow user', async (done)=>{
            //Arrange
            const params = getFollowParams();
            when(userRepository.findById(params.userId)).thenReturn(getUser());
            when(userRepository.findById(params.followingUserId)).thenReturn(getFollowingUser());
            const userFollowing : IUserFollowing = {userId: params.userId, followingUserId: params.followingUserId};

            //Act
            try{
                await userFollowingService.follow(params.userId, params.followingUserId);

            //Assert
                verify(
                    userFollowingRepository.createAndSave({
                        userId: params.userId, 
                        followingUserId: params.followingUserId
                    })).called() 
            }catch(err){
                done(err);
            }
        })
    })


})


function getFollowParams() { return { userId: 1, followingUserId: 2 } };
async function getUser(){return {id: 1, username: "testUser", emailAddress: "test@address.pl", salt: "xyz", password: "veryStrong" }}
async function getFollowingUser(){return {id: 2, username: "testFollowingUser", emailAddress: "test@address.pl", salt: "xyz", password: "veryStrong" }}
async function getUserFollowing(){return {userId: 1, followingUserId: 2}}
