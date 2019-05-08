import express = require("express");
import { UserClient, AuthenticateRequest } from '@instagram-node/common'
import { CreateUserRequest } from "@instagram-node/common";
import { credentials } from 'grpc';
import { createUserValidator, loginValidator } from "./user.validators";
import { requestValidator } from "../middlewares/requestValidator";
import { AuthenticateResponse } from "@instagram-node/common";
import jwt from 'jsonwebtoken'


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

userRouter.post('/login', loginValidator, requestValidator, (req: express.Request, res: express.Response) => {
  const { emailAddress, password } = req.body;
  const request = new AuthenticateRequest();
  request.setEmailaddress(emailAddress);
  request.setPassword(password);

  userServiceClient.authenticate(request, (err, result: AuthenticateResponse) => {
    if (err)
      return res.send(err);

    const secret = process.env.JWT_SECRET;
    if (secret !== undefined)
      jwt.sign(result.toObject(), secret, { expiresIn: 36000 }, (err, token) => {
        if (err)
          res.status(500).json({
            error: "Error signing token",
            raw: err
          });
        res.json({
          success: true,
          token: `Bearer ${token}`
        })
      })
    else
      res.status(400).json("Something goes wrong");
  })
})

export { userRouter };    