import { UserAppService } from './../src/user.service';
import { getRepository, Repository, Connection } from "typeorm";
import { UserModel } from './../src/user.model';
import { ServerUnaryCall } from "grpc";
import { CreateUserRequest, AuthenticateRequest } from "@instagram-node/common";
import { createTestConnection } from "./utils/createTestConnection";
import { expect } from 'chai';
import { resources } from '../src/resources';
import { User } from '../src/user.entity';

const username = "Test";
const password = "Password"
const emailAddress = "test@test.pl"

describe('User App service', () => {
    let userRepository: Repository<UserModel>;
    let userService: UserAppService;
    let connection: Connection;
 
    before(async () => {
        connection = await createTestConnection();
        userRepository = getRepository(UserModel);
        userService = new UserAppService(userRepository)
    })
    afterEach(() => {
        userRepository.createQueryBuilder()
        .delete()
        .execute();
    })
    it('should create new user', async () => {
        const request = createCreateUserRequest();

        const callback = (err:any, res:any) => {
            expect(err).to.be.null;
            expect(res).to.not.be.null;
        }

        await userService.create(createServerUnaryCall<CreateUserRequest>(request), callback);

        const user = await userRepository.findOne({ username });
        expect(user).to.not.be.undefined;
        expect(user.password).to.not.equal("Password");
        expect(user.username).to.equal("Test");
        expect(user.emailAddress).to.equal("test@test.pl");
    })

    it('should throw error when password not exist', async ()=>{
        const request = createCreateUserRequest()
        request.setPassword(null);

        await userService.create(createServerUnaryCall<CreateUserRequest>(request), (err, res) => {
            expect(err.message).to.equal(resources.errors.PasswordsAreNoEqual)
        })
    })

    it('should throw error when user with this email is exist', async ()=>{

        const user = new User(username, emailAddress, '', password);
        var entity = userRepository.create(user);
        await userRepository.save(entity);
        const request = createCreateUserRequest()

        await userService.create(createServerUnaryCall<CreateUserRequest>(request), (err, res) => {
            expect(err.message).to.equal(resources.errors.UserWithThisEmailExist)
        })
    })

    it('should throw error when username is empty', async ()=>{

        const request = createCreateUserRequest()
        request.setUsername("");

        await userService.create(createServerUnaryCall<CreateUserRequest>(request), (err, res) => {
            expect(err.message).to.equal("Username must have at least 3 characters.")
        })
    })

    it('should authenticate user when user exist', async ()=>{
        const request = createCreateUserRequest()
        await userService.create(createServerUnaryCall<CreateUserRequest>(request), ()=>{});
        const authenticateRequest = createAuthenticateRequest();

        await userService.authenticate(createServerUnaryCall<AuthenticateRequest>(authenticateRequest), (err, res) => {
            expect(res.getUserid()).is.not.null;
        });
    })

    it('should not authenticate user when password is invalid', async ()=>{
        const request = createCreateUserRequest();
        await userService.create(createServerUnaryCall<CreateUserRequest>(request), ()=>{});
        const authenticateRequest = createAuthenticateRequest();
        authenticateRequest.setPassword('invalidPassword')

        await userService.authenticate(createServerUnaryCall<AuthenticateRequest>(authenticateRequest), (err, res) => {
            expect(res).is.null;
            expect(err).is.not.null;
            expect(err.message).is.equal(resources.errors.PasswordIsInvalid)
        });
    })

    it('should not authenticate user when user not exist', async ()=>{
        const authenticateRequest = createAuthenticateRequest();

        await userService.authenticate(createServerUnaryCall<AuthenticateRequest>(authenticateRequest), (err, res) => {
            expect(res).is.null;
            expect(err).is.not.null;
            expect(err.message).is.equal(resources.errors.UserWithThisEmailNotExist)
        });
    })

})


function createServerUnaryCall<T>(request: T) {
    const call = {
        cancelled: false,
        metadata: {},
        request: request
    }

    return call as any as ServerUnaryCall<T>;
}

function createCreateUserRequest() {
    const request = new CreateUserRequest();

    request.setUsername(username);
    request.setPassword(password);
    request.setConfirmpassword(password);
    request.setEmailaddress(emailAddress);

    return request;
}

function createAuthenticateRequest() {
    const request = new AuthenticateRequest();

    request.setPassword(password);
    request.setEmailaddress(emailAddress);

    return request;
}
