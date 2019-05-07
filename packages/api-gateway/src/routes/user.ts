import express = require("express");
import { UserServiceClient } from '@instagram-node/common'
import { CreateUserRequest } from "@instagram-node/common";
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const userRouter = express.Router();
const userServiceClient = new UserServiceClient('0.0.0.0:5001')

const REMOTE_SERVER = '0.0.0.0:5001'

var proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("./src/proto/user.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

const client = new proto.UserService(REMOTE_SERVER, grpc.credentials.createInsecure())

userRouter.post('/', (req: express.Request, res: express.Response) => {
  const request: CreateUserRequest = new CreateUserRequest();
  request.setUsername('adam');
  client.createUser(request, () => console.log('done'));
  res.send("User has been created")
})

export { userRouter };    