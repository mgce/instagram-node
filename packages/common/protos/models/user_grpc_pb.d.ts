// package: grpc.user.v1
// file: user.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as user_pb from "./user_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createUser: IUserService_ICreateUser;
}

interface IUserService_ICreateUser extends grpc.MethodDefinition<user_pb.CreateUserRequest, user_pb.EmptyResponse> {
    path: string; // "/grpc.user.v1.User/CreateUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.CreateUserRequest>;
    requestDeserialize: grpc.deserialize<user_pb.CreateUserRequest>;
    responseSerialize: grpc.serialize<user_pb.EmptyResponse>;
    responseDeserialize: grpc.deserialize<user_pb.EmptyResponse>;
}

export const UserService: IUserService;

export interface IUserServer {
    createUser: grpc.handleUnaryCall<user_pb.CreateUserRequest, user_pb.EmptyResponse>;
}

export interface IUserClient {
    createUser(request: user_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    createUser(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    createUser(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createUser(request: user_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public createUser(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public createUser(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
}
