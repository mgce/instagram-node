import { createTestConnection } from "./utils/createTestConnection";
import { Connection } from "typeorm";
import { UserRepository } from './../src/dataAccess/repositories/user.repo';
import { UserFollowingRepository } from './../src/dataAccess/repositories/userFollowing.repo';
import { UserModel } from './../src/dataAccess/models/user.model';
import { UserFollowingModel } from "../src/dataAccess";
import { UserFollowingAppService } from "../src/services/userFollowing.service"
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import { resources } from "../src/resources";

describe('User Following service', ()=>{
    let connection: Connection;
    let userRepository: UserRepository;
    let userFollowingRepository: UserFollowingRepository;
    let userFollowingService:UserFollowingAppService;
    before(async ()=>{
        connection = await createTestConnection();
        userRepository = new UserRepository();
        userFollowingRepository = new UserFollowingRepository();
        userFollowingService = new UserFollowingAppService(userRepository, userFollowingRepository);
    })
    afterEach(() => {
        connection.getRepository(UserModel).createQueryBuilder()
        .delete()
        .execute();

        connection.getRepository(UserFollowingModel).createQueryBuilder()
        .delete()
        .execute();
    })

    it('should throw error if user id is undefined', async()=>{
        const params = getFollowParams();
        try{
            await userFollowingService.follow(undefined, params.userFollowingId);
        }catch(err){
            expect(err).to.be.not.null;
            expect(err.message).to.be.equal(resources.errors.UserIdIsEmpty)
        }
    })

    it('should throw error if userFollowingId id is undefined', async()=>{
        const params = getFollowParams();
        try{
            await userFollowingService.follow(params.userId, undefined);
        }catch(err){
            expect(err).to.be.not.null;
        }
    })
})


function getFollowParams(){return {userId: 1, userFollowingId: 2}};