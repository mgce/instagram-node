// package: grpc.user.v1
// file: user.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

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

export class EmptyResponse extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmptyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: EmptyResponse): EmptyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmptyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmptyResponse;
    static deserializeBinaryFromReader(message: EmptyResponse, reader: jspb.BinaryReader): EmptyResponse;
}

export namespace EmptyResponse {
    export type AsObject = {
        message: string,
    }
}
