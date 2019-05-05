"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_pb_service_1 = require("@instagram-node/common/proto/user-service/user_pb_service");
const user_pb_1 = require("@instagram-node/common/proto/user-service/user_pb");
const userRouter = express.Router();
exports.userRouter = userRouter;
const userServiceClient = new user_pb_service_1.UserServiceClient('');
userRouter.post('/', (req, res) => {
    const request = new user_pb_1.CreateUserRequest();
    request.setUsername('adam');
    userServiceClient.createUser(request, () => console.log('done'));
});
//# sourceMappingURL=user.js.map