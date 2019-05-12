// package: grpc.post.v1
// file: post.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as post_pb from "./post_pb";
import * as common_pb from "./common_pb";

interface IPostService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    add: IPostService_IAdd;
    delete: IPostService_IDelete;
}

interface IPostService_IAdd extends grpc.MethodDefinition<post_pb.CreatePostRequest, post_pb.PostCreatedResponse> {
    path: string; // "/grpc.post.v1.Post/Add"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<post_pb.CreatePostRequest>;
    requestDeserialize: grpc.deserialize<post_pb.CreatePostRequest>;
    responseSerialize: grpc.serialize<post_pb.PostCreatedResponse>;
    responseDeserialize: grpc.deserialize<post_pb.PostCreatedResponse>;
}
interface IPostService_IDelete extends grpc.MethodDefinition<post_pb.DeletePostRequest, common_pb.EmptyResponse> {
    path: string; // "/grpc.post.v1.Post/Delete"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<post_pb.DeletePostRequest>;
    requestDeserialize: grpc.deserialize<post_pb.DeletePostRequest>;
    responseSerialize: grpc.serialize<common_pb.EmptyResponse>;
    responseDeserialize: grpc.deserialize<common_pb.EmptyResponse>;
}

export const PostService: IPostService;

export interface IPostServer {
    add: grpc.handleUnaryCall<post_pb.CreatePostRequest, post_pb.PostCreatedResponse>;
    delete: grpc.handleUnaryCall<post_pb.DeletePostRequest, common_pb.EmptyResponse>;
}

export interface IPostClient {
    add(request: post_pb.CreatePostRequest, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    add(request: post_pb.CreatePostRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    add(request: post_pb.CreatePostRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    delete(request: post_pb.DeletePostRequest, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    delete(request: post_pb.DeletePostRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    delete(request: post_pb.DeletePostRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
}

export class PostClient extends grpc.Client implements IPostClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public add(request: post_pb.CreatePostRequest, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    public add(request: post_pb.CreatePostRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    public add(request: post_pb.CreatePostRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    public delete(request: post_pb.DeletePostRequest, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public delete(request: post_pb.DeletePostRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public delete(request: post_pb.DeletePostRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
}
