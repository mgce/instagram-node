import { UserAppService } from './../src/services/user.service';
import { getRepository, Repository, Connection } from "typeorm";
import { UserModel } from './../src/models/user.model';
import { ServerUnaryCall } from "grpc";
import { CreateUserRequest } from "@instagram-node/common";
import { createTestConnection } from "./utils/createTestConnection";
import { expect } from 'chai';
import { resources } from '../src/resources';

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
        .where("id = :id", { id: 1 })
        .execute();
    })
    it('should create new user', async () => {
        const request = createCreateUserRequest();

        const callback = (err:any, res:any) => {
            expect(err).to.be.null;
            expect(res).to.not.be.null;
        }

        await userService.createUser(createServerUnaryCall<CreateUserRequest>(request), callback);

        const user = await userRepository.findOne({ username });
        expect(user).to.not.be.undefined;
        expect(user.password).to.not.equal("Password");
        expect(user.username).to.equal("Test");
        expect(user.emailAddress).to.equal("test@test.pl");
    })

    it('should throw error when password not exist', async ()=>{
        const request = createCreateUserRequest()
        request.setPassword(null);

        await userService.createUser(createServerUnaryCall<CreateUserRequest>(request), (err, res) => {
            expect(err.message).to.equal(resources.errors.PasswordsAreNoEqual)
        })
    })
})

// 2. Check if error is password exist
// 3. Check if error is thrown when passwords are not equal


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

