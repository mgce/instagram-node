import express = require("express");
import { UserClient } from '@instagram-node/common'
import { CreateUserRequest } from "@instagram-node/common";
import { credentials } from 'grpc';
const protoLoader = require('@grpc/proto-loader');

const userRouter = express.Router();
const userServiceClient = new UserClient('0.0.0.0:5001', credentials.createInsecure())

userRouter.post('/', (req: express.Request, res: express.Response) => {
  const request: CreateUserRequest = new CreateUserRequest();
  request.setUsername('adam');
  userServiceClient.createUser(request, (err, result) => res.send(result.getMessage()));
})

export { userRouter };    