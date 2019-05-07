// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var user_pb = require('./user_pb.js');

function serialize_grpc_user_v1_CreateUserRequest(arg) {
  if (!(arg instanceof user_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type grpc.user.v1.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_user_v1_CreateUserRequest(buffer_arg) {
  return user_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_user_v1_EmptyResponse(arg) {
  if (!(arg instanceof user_pb.EmptyResponse)) {
    throw new Error('Expected argument of type grpc.user.v1.EmptyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_user_v1_EmptyResponse(buffer_arg) {
  return user_pb.EmptyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserService = exports.UserService = {
  createUser: {
    path: '/grpc.user.v1.User/createUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.CreateUserRequest,
    responseType: user_pb.EmptyResponse,
    requestSerialize: serialize_grpc_user_v1_CreateUserRequest,
    requestDeserialize: deserialize_grpc_user_v1_CreateUserRequest,
    responseSerialize: serialize_grpc_user_v1_EmptyResponse,
    responseDeserialize: deserialize_grpc_user_v1_EmptyResponse,
  },
};

exports.UserClient = grpc.makeGenericClientConstructor(UserService);
