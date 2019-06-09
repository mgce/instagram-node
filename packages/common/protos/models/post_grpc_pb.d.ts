// package: grpc.post.v1
// file: post.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as post_pb from "./post_pb";
import * as common_pb from "./common_pb";

interface IPostService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    create: IPostService_ICreate;
    delete: IPostService_IDelete;
    getPosts: IPostService_IGetPosts;
}

interface IPostService_ICreate extends grpc.MethodDefinition<post_pb.CreatePostRequest, post_pb.PostCreatedResponse> {
    path: string; // "/grpc.post.v1.Post/Create"
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
interface IPostService_IGetPosts extends grpc.MethodDefinition<post_pb.GetPostsRequest, post_pb.GetPostsResponse> {
    path: string; // "/grpc.post.v1.Post/GetPosts"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<post_pb.GetPostsRequest>;
    requestDeserialize: grpc.deserialize<post_pb.GetPostsRequest>;
    responseSerialize: grpc.serialize<post_pb.GetPostsResponse>;
    responseDeserialize: grpc.deserialize<post_pb.GetPostsResponse>;
}

export const PostService: IPostService;

export interface IPostServer {
    create: grpc.handleUnaryCall<post_pb.CreatePostRequest, post_pb.PostCreatedResponse>;
    delete: grpc.handleUnaryCall<post_pb.DeletePostRequest, common_pb.EmptyResponse>;
    getPosts: grpc.handleUnaryCall<post_pb.GetPostsRequest, post_pb.GetPostsResponse>;
}

export interface IPostClient {
    create(request: post_pb.CreatePostRequest, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    create(request: post_pb.CreatePostRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    create(request: post_pb.CreatePostRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    delete(request: post_pb.DeletePostRequest, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    delete(request: post_pb.DeletePostRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    delete(request: post_pb.DeletePostRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    getPosts(request: post_pb.GetPostsRequest, callback: (error: grpc.ServiceError | null, response: post_pb.GetPostsResponse) => void): grpc.ClientUnaryCall;
    getPosts(request: post_pb.GetPostsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: post_pb.GetPostsResponse) => void): grpc.ClientUnaryCall;
    getPosts(request: post_pb.GetPostsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: post_pb.GetPostsResponse) => void): grpc.ClientUnaryCall;
}

export class PostClient extends grpc.Client implements IPostClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public create(request: post_pb.CreatePostRequest, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    public create(request: post_pb.CreatePostRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    public create(request: post_pb.CreatePostRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: post_pb.PostCreatedResponse) => void): grpc.ClientUnaryCall;
    public delete(request: post_pb.DeletePostRequest, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public delete(request: post_pb.DeletePostRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public delete(request: post_pb.DeletePostRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public getPosts(request: post_pb.GetPostsRequest, callback: (error: grpc.ServiceError | null, response: post_pb.GetPostsResponse) => void): grpc.ClientUnaryCall;
    public getPosts(request: post_pb.GetPostsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: post_pb.GetPostsResponse) => void): grpc.ClientUnaryCall;
    public getPosts(request: post_pb.GetPostsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: post_pb.GetPostsResponse) => void): grpc.ClientUnaryCall;
}
