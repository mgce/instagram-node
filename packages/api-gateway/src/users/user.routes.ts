import express = require("express");
import { CreateUserRequest } from '@instagram-node/common'
import { createUserValidator } from "./user.validators";
import { requestValidator } from "../middlewares/requestValidator";
import { UserClient } from "./user.client";

const userRouter = express.Router();

userRouter.post('/', createUserValidator, requestValidator, (req: express.Request, res: express.Response) => {
  const request: CreateUserRequest = new CreateUserRequest();
  const { username, password, confirmPassword, emailAddress } = req.body;

  request.setUsername(username);
  request.setPassword(password);
  request.setConfirmpassword(confirmPassword);
  request.setEmailaddress(emailAddress);

  UserClient.createUser(request, (err, result) => {
    if (err)
      return res.send(err);
    return res.send(result.getMessage())
  });
})

export { userRouter };    