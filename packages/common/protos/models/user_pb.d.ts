// package: grpc.user.v1
// file: user.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class CreateUserRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): void;

    getEmailaddress(): string;
    setEmailaddress(value: string): void;

    getPassword(): string;
    setPassword(value: string): void;

    getConfirmpassword(): string;
    setConfirmpassword(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateUserRequest): CreateUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateUserRequest;
    static deserializeBinaryFromReader(message: CreateUserRequest, reader: jspb.BinaryReader): CreateUserRequest;
}

export namespace CreateUserRequest {
    export type AsObject = {
        username: string,
        emailaddress: string,
        password: string,
        confirmpassword: string,
    }
}

export class AuthenticateRequest extends jspb.Message { 
    getEmailaddress(): string;
    setEmailaddress(value: string): void;

    getPassword(): string;
    setPassword(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthenticateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AuthenticateRequest): AuthenticateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthenticateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthenticateRequest;
    static deserializeBinaryFromReader(message: AuthenticateRequest, reader: jspb.BinaryReader): AuthenticateRequest;
}

export namespace AuthenticateRequest {
    export type AsObject = {
        emailaddress: string,
        password: string,
    }
}

export class AuthenticateResponse extends jspb.Message { 
    getUserid(): number;
    setUserid(value: number): void;

    getUsername(): string;
    setUsername(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthenticateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AuthenticateResponse): AuthenticateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthenticateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthenticateResponse;
    static deserializeBinaryFromReader(message: AuthenticateResponse, reader: jspb.BinaryReader): AuthenticateResponse;
}

export namespace AuthenticateResponse {
    export type AsObject = {
        userid: number,
        username: string,
    }
}

export class GetByIdRequest extends jspb.Message { 
    getUserid(): number;
    setUserid(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetByIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetByIdRequest): GetByIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetByIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetByIdRequest;
    static deserializeBinaryFromReader(message: GetByIdRequest, reader: jspb.BinaryReader): GetByIdRequest;
}

export namespace GetByIdRequest {
    export type AsObject = {
        userid: number,
    }
}

export class GetByIdResponse extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getUsername(): string;
    setUsername(value: string): void;

    getEmailaddress(): string;
    setEmailaddress(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetByIdResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetByIdResponse): GetByIdResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetByIdResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetByIdResponse;
    static deserializeBinaryFromReader(message: GetByIdResponse, reader: jspb.BinaryReader): GetByIdResponse;
}

export namespace GetByIdResponse {
    export type AsObject = {
        id: number,
        username: string,
        emailaddress: string,
    }
}

export class GetUserDetailsResponse extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getUsername(): string;
    setUsername(value: string): void;

    getEmailaddress(): string;
    setEmailaddress(value: string): void;

    getFollowers(): number;
    setFollowers(value: number): void;

    getFollowing(): number;
    setFollowing(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserDetailsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserDetailsResponse): GetUserDetailsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserDetailsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserDetailsResponse;
    static deserializeBinaryFromReader(message: GetUserDetailsResponse, reader: jspb.BinaryReader): GetUserDetailsResponse;
}

export namespace GetUserDetailsResponse {
    export type AsObject = {
        id: number,
        username: string,
        emailaddress: string,
        followers: number,
        following: number,
    }
}
