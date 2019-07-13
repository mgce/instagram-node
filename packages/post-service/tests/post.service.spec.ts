import { getRepository, Repository, Connection } from "typeorm";
import { ServerUnaryCall } from "grpc";
import { CreateUserRequest, AuthenticateRequest, CreatePostRequest } from "@instagram-node/common";
import { createTestConnection } from "./utils/createTestConnection";
import { expect } from 'chai';
import { PostModel } from './../src/dataAccess/models/post.model';
import { PostAppService } from './../src/services/post.service';

const userId = 1;
const description = "Desc"
const imageUrl = "http://"

describe('Post App service', () => {
    let postRepository: Repository<PostModel>;
    let postService: PostAppService;
    let connection: Connection;
 
    before(async () => {
        connection = await createTestConnection();
        postRepository = getRepository(PostModel);
        postService = new PostAppService(postRepository)
    })
    afterEach(() => {
        postRepository.createQueryBuilder()
        .delete()
        .execute();
    })
    it('should create new post', async () => {
        const request = createPostRequest();

        const callback = (err:any, res:any) => {
            expect(err).to.be.null;
            expect(res).to.not.be.null;
        }

        await postService.create(createServerUnaryCall<CreatePostRequest>(request), callback);

        const post = await postRepository.findOne({ userId });
        expect(post).to.not.be.undefined;
        expect(post.userId).to.equal(userId);
        expect(post.description).to.equal(description);
        expect(post.imageUrl).to.equal(imageUrl);
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

function createPostRequest() {
    const request = new CreatePostRequest();

    request.setUserid(userId);
    request.setDescription(description);
    request.setImageid(imageUrl);

    return request;
}

function createAuthenticateRequest() {
    const request = new AuthenticateRequest();

    request.setPassword(password);
    request.setEmailaddress(emailAddress);

    return request;
}
