// package: grpc.user.v1
// file: user.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as user_pb from "./user_pb";
import * as common_pb from "./common_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createUser: IUserService_ICreateUser;
    authenticate: IUserService_IAuthenticate;
}

interface IUserService_ICreateUser extends grpc.MethodDefinition<user_pb.CreateUserRequest, common_pb.EmptyResponse> {
    path: string; // "/grpc.user.v1.User/CreateUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.CreateUserRequest>;
    requestDeserialize: grpc.deserialize<user_pb.CreateUserRequest>;
    responseSerialize: grpc.serialize<common_pb.EmptyResponse>;
    responseDeserialize: grpc.deserialize<common_pb.EmptyResponse>;
}
interface IUserService_IAuthenticate extends grpc.MethodDefinition<user_pb.AuthenticateRequest, user_pb.AuthenticateResponse> {
    path: string; // "/grpc.user.v1.User/Authenticate"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.AuthenticateRequest>;
    requestDeserialize: grpc.deserialize<user_pb.AuthenticateRequest>;
    responseSerialize: grpc.serialize<user_pb.AuthenticateResponse>;
    responseDeserialize: grpc.deserialize<user_pb.AuthenticateResponse>;
}

export const UserService: IUserService;

export interface IUserServer {
    createUser: grpc.handleUnaryCall<user_pb.CreateUserRequest, common_pb.EmptyResponse>;
    authenticate: grpc.handleUnaryCall<user_pb.AuthenticateRequest, user_pb.AuthenticateResponse>;
}

export interface IUserClient {
    createUser(request: user_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    createUser(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    createUser(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    authenticate(request: user_pb.AuthenticateRequest, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
    authenticate(request: user_pb.AuthenticateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
    authenticate(request: user_pb.AuthenticateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createUser(request: user_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public createUser(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public createUser(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public authenticate(request: user_pb.AuthenticateRequest, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
    public authenticate(request: user_pb.AuthenticateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
    public authenticate(request: user_pb.AuthenticateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
}
