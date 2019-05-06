import express = require("express");
import {UserServiceClient} from '@instagram-node/common'
import { CreateUserRequest } from "@instagram-node/common";

const userRouter = express.Router();
const userServiceClient = new UserServiceClient('')

userRouter.post('/', (req:express.Request, res:express.Response)=>{
    const request:CreateUserRequest = new CreateUserRequest();
    request.setUsername('adam');
    userServiceClient.createUser(request, ()=> console.log('done'));
    res.send("User has been created")
})

export {userRouter};    