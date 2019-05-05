import express = require("express");
import {UserServiceClient} from '@instagram-node/common/src/proto/user-service/user_pb_service'
import { credentials } from "grpc";
import { CreateUserRequest } from "@instagram-node/common/src/proto/user-service/user_pb";

const userRouter = express.Router();
const userServiceClient = new UserServiceClient('')

userRouter.post('/', (req, res)=>{
    const request:CreateUserRequest = new CreateUserRequest();
    request.setUsername('adam');
    userServiceClient.createUser(request, ()=> console.log('done'))
})

export {userRouter};