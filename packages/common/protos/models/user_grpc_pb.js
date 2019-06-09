// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var user_pb = require('./user_pb.js');
var common_pb = require('./common_pb.js');

function serialize_common_EmptyResponse(arg) {
  if (!(arg instanceof common_pb.EmptyResponse)) {
    throw new Error('Expected argument of type common.EmptyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_common_EmptyResponse(buffer_arg) {
  return common_pb.EmptyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_user_v1_AuthenticateRequest(arg) {
  if (!(arg instanceof user_pb.AuthenticateRequest)) {
    throw new Error('Expected argument of type grpc.user.v1.AuthenticateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_user_v1_AuthenticateRequest(buffer_arg) {
  return user_pb.AuthenticateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_user_v1_AuthenticateResponse(arg) {
  if (!(arg instanceof user_pb.AuthenticateResponse)) {
    throw new Error('Expected argument of type grpc.user.v1.AuthenticateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_user_v1_AuthenticateResponse(buffer_arg) {
  return user_pb.AuthenticateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_user_v1_CreateUserRequest(arg) {
  if (!(arg instanceof user_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type grpc.user.v1.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_user_v1_CreateUserRequest(buffer_arg) {
  return user_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_user_v1_GetByIdRequest(arg) {
  if (!(arg instanceof user_pb.GetByIdRequest)) {
    throw new Error('Expected argument of type grpc.user.v1.GetByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_user_v1_GetByIdRequest(buffer_arg) {
  return user_pb.GetByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_user_v1_GetByIdResponse(arg) {
  if (!(arg instanceof user_pb.GetByIdResponse)) {
    throw new Error('Expected argument of type grpc.user.v1.GetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_user_v1_GetByIdResponse(buffer_arg) {
  return user_pb.GetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserService = exports.UserService = {
  create: {
    path: '/grpc.user.v1.User/Create',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.CreateUserRequest,
    responseType: common_pb.EmptyResponse,
    requestSerialize: serialize_grpc_user_v1_CreateUserRequest,
    requestDeserialize: deserialize_grpc_user_v1_CreateUserRequest,
    responseSerialize: serialize_common_EmptyResponse,
    responseDeserialize: deserialize_common_EmptyResponse,
  },
  authenticate: {
    path: '/grpc.user.v1.User/Authenticate',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.AuthenticateRequest,
    responseType: user_pb.AuthenticateResponse,
    requestSerialize: serialize_grpc_user_v1_AuthenticateRequest,
    requestDeserialize: deserialize_grpc_user_v1_AuthenticateRequest,
    responseSerialize: serialize_grpc_user_v1_AuthenticateResponse,
    responseDeserialize: deserialize_grpc_user_v1_AuthenticateResponse,
  },
  getById: {
    path: '/grpc.user.v1.User/GetById',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetByIdRequest,
    responseType: user_pb.GetByIdResponse,
    requestSerialize: serialize_grpc_user_v1_GetByIdRequest,
    requestDeserialize: deserialize_grpc_user_v1_GetByIdRequest,
    responseSerialize: serialize_grpc_user_v1_GetByIdResponse,
    responseDeserialize: deserialize_grpc_user_v1_GetByIdResponse,
  },
};

exports.UserClient = grpc.makeGenericClientConstructor(UserService);
