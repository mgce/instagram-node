import { describe } from "mocha";
import { UserAppService } from './../src/services/user.service';
import { getRepository, Repository, Connection } from "typeorm";
import { UserModel } from './../src/models/user.model';
import { ServerUnaryCall } from "grpc";
import { CreateUserRequest } from "@instagram-node/common";
import { createTestConnection } from "./utils/createTestConnection";
import { expect } from 'chai';

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
        connection.synchronize(true);
    })
    it('should create new user', (done) => {
        const request = new CreateUserRequest();

        const username = "Test";
        const password = "Password"
        const emailAddress = "test@test.pl"

        request.setUsername(username);
        request.setPassword(password);
        request.setConfirmpassword(password);
        request.setEmailaddress(emailAddress);

        userService.createUser(createServerUnaryCall<CreateUserRequest>(request), (err, res) => {
            expect(err).to.be.null;
            expect(res).to.not.be.null;

            userRepository.findOne({ username: "Test" }).then((user) => {
                expect(user).to.not.be.null;

                if (!user)
                    return done("User not exist")

                expect(user.password).to.not.equal(password);
                expect(user.username).to.equal(username);
                expect(user.emailAddress).to.equal(emailAddress);
                done();
            }).catch(err => done(err));
        })
    })
})

// 2. Check if error is password exist
// 3. Check if error is thrown when passwords are not equal


function createServerUnaryCall<T>(request: T) {
    const call = {
        cancelled: false,
        metadata: null,
        request: request
    }

    return call as any as ServerUnaryCall<T>;
}

