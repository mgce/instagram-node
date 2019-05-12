// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var post_pb = require('./post_pb.js');
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

function serialize_grpc_post_v1_CreatePostRequest(arg) {
  if (!(arg instanceof post_pb.CreatePostRequest)) {
    throw new Error('Expected argument of type grpc.post.v1.CreatePostRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_post_v1_CreatePostRequest(buffer_arg) {
  return post_pb.CreatePostRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_post_v1_DeletePostRequest(arg) {
  if (!(arg instanceof post_pb.DeletePostRequest)) {
    throw new Error('Expected argument of type grpc.post.v1.DeletePostRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_post_v1_DeletePostRequest(buffer_arg) {
  return post_pb.DeletePostRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_post_v1_PostCreatedResponse(arg) {
  if (!(arg instanceof post_pb.PostCreatedResponse)) {
    throw new Error('Expected argument of type grpc.post.v1.PostCreatedResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_post_v1_PostCreatedResponse(buffer_arg) {
  return post_pb.PostCreatedResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PostService = exports.PostService = {
  add: {
    path: '/grpc.post.v1.Post/Add',
    requestStream: false,
    responseStream: false,
    requestType: post_pb.CreatePostRequest,
    responseType: post_pb.PostCreatedResponse,
    requestSerialize: serialize_grpc_post_v1_CreatePostRequest,
    requestDeserialize: deserialize_grpc_post_v1_CreatePostRequest,
    responseSerialize: serialize_grpc_post_v1_PostCreatedResponse,
    responseDeserialize: deserialize_grpc_post_v1_PostCreatedResponse,
  },
  delete: {
    path: '/grpc.post.v1.Post/Delete',
    requestStream: false,
    responseStream: false,
    requestType: post_pb.DeletePostRequest,
    responseType: common_pb.EmptyResponse,
    requestSerialize: serialize_grpc_post_v1_DeletePostRequest,
    requestDeserialize: deserialize_grpc_post_v1_DeletePostRequest,
    responseSerialize: serialize_common_EmptyResponse,
    responseDeserialize: deserialize_common_EmptyResponse,
  },
};

exports.PostClient = grpc.makeGenericClientConstructor(PostService);
