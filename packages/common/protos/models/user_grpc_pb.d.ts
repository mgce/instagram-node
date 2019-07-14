// package: grpc.user.v1
// file: user.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as user_pb from "./user_pb";
import * as common_pb from "./common_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    create: IUserService_ICreate;
    authenticate: IUserService_IAuthenticate;
    getById: IUserService_IGetById;
    getUserDetails: IUserService_IGetUserDetails;
}

interface IUserService_ICreate extends grpc.MethodDefinition<user_pb.CreateUserRequest, common_pb.EmptyResponse> {
    path: string; // "/grpc.user.v1.User/Create"
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
interface IUserService_IGetById extends grpc.MethodDefinition<user_pb.GetByIdRequest, user_pb.GetByIdResponse> {
    path: string; // "/grpc.user.v1.User/GetById"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.GetByIdRequest>;
    requestDeserialize: grpc.deserialize<user_pb.GetByIdRequest>;
    responseSerialize: grpc.serialize<user_pb.GetByIdResponse>;
    responseDeserialize: grpc.deserialize<user_pb.GetByIdResponse>;
}
interface IUserService_IGetUserDetails extends grpc.MethodDefinition<user_pb.GetByIdRequest, user_pb.GetUserDetailsResponse> {
    path: string; // "/grpc.user.v1.User/GetUserDetails"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.GetByIdRequest>;
    requestDeserialize: grpc.deserialize<user_pb.GetByIdRequest>;
    responseSerialize: grpc.serialize<user_pb.GetUserDetailsResponse>;
    responseDeserialize: grpc.deserialize<user_pb.GetUserDetailsResponse>;
}

export const UserService: IUserService;

export interface IUserServer {
    create: grpc.handleUnaryCall<user_pb.CreateUserRequest, common_pb.EmptyResponse>;
    authenticate: grpc.handleUnaryCall<user_pb.AuthenticateRequest, user_pb.AuthenticateResponse>;
    getById: grpc.handleUnaryCall<user_pb.GetByIdRequest, user_pb.GetByIdResponse>;
    getUserDetails: grpc.handleUnaryCall<user_pb.GetByIdRequest, user_pb.GetUserDetailsResponse>;
}

export interface IUserClient {
    create(request: user_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    create(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    create(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    authenticate(request: user_pb.AuthenticateRequest, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
    authenticate(request: user_pb.AuthenticateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
    authenticate(request: user_pb.AuthenticateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
    getById(request: user_pb.GetByIdRequest, callback: (error: grpc.ServiceError | null, response: user_pb.GetByIdResponse) => void): grpc.ClientUnaryCall;
    getById(request: user_pb.GetByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.GetByIdResponse) => void): grpc.ClientUnaryCall;
    getById(request: user_pb.GetByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.GetByIdResponse) => void): grpc.ClientUnaryCall;
    getUserDetails(request: user_pb.GetByIdRequest, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserDetailsResponse) => void): grpc.ClientUnaryCall;
    getUserDetails(request: user_pb.GetByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserDetailsResponse) => void): grpc.ClientUnaryCall;
    getUserDetails(request: user_pb.GetByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserDetailsResponse) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public create(request: user_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public create(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public create(request: user_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: common_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public authenticate(request: user_pb.AuthenticateRequest, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
    public authenticate(request: user_pb.AuthenticateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
    public authenticate(request: user_pb.AuthenticateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.AuthenticateResponse) => void): grpc.ClientUnaryCall;
    public getById(request: user_pb.GetByIdRequest, callback: (error: grpc.ServiceError | null, response: user_pb.GetByIdResponse) => void): grpc.ClientUnaryCall;
    public getById(request: user_pb.GetByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.GetByIdResponse) => void): grpc.ClientUnaryCall;
    public getById(request: user_pb.GetByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.GetByIdResponse) => void): grpc.ClientUnaryCall;
    public getUserDetails(request: user_pb.GetByIdRequest, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserDetailsResponse) => void): grpc.ClientUnaryCall;
    public getUserDetails(request: user_pb.GetByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserDetailsResponse) => void): grpc.ClientUnaryCall;
    public getUserDetails(request: user_pb.GetByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserDetailsResponse) => void): grpc.ClientUnaryCall;
}
