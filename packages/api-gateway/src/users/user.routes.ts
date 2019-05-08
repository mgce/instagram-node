import express = require("express");
import { UserClient } from '@instagram-node/common'
import { CreateUserRequest } from "@instagram-node/common";
import { credentials } from 'grpc';
import { body, validationResult } from 'express-validator/check';
import { createUserValidator } from "./user.validators";
import { requestValidator } from "../middlewares/requestValidator";

const userRouter = express.Router();
const userServiceClient = new UserClient('0.0.0.0:5001', credentials.createInsecure())

userRouter.post('/', createUserValidator, requestValidator, (req: express.Request, res: express.Response) => {
  const request: CreateUserRequest = new CreateUserRequest();
  const { username, password, confirmPassword, emailAddress } = req.body;

  request.setUsername(username);
  request.setPassword(password);
  request.setConfirmpassword(confirmPassword);
  request.setEmailaddress(emailAddress);
  
  userServiceClient.createUser(request, (err, result) => {
    if (err)
      return res.send(err);
    return res.send(result.getMessage())
  });
})

export { userRouter };    