// package: grpc.post.v1
// file: post.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class CreatePostRequest extends jspb.Message { 
    getUserid(): number;
    setUserid(value: number): void;

    getImageurl(): string;
    setImageurl(value: string): void;

    getDescription(): string;
    setDescription(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreatePostRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreatePostRequest): CreatePostRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreatePostRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreatePostRequest;
    static deserializeBinaryFromReader(message: CreatePostRequest, reader: jspb.BinaryReader): CreatePostRequest;
}

export namespace CreatePostRequest {
    export type AsObject = {
        userid: number,
        imageurl: string,
        description: string,
    }
}

export class PostCreatedResponse extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): void;

    getPostid(): number;
    setPostid(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PostCreatedResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PostCreatedResponse): PostCreatedResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PostCreatedResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PostCreatedResponse;
    static deserializeBinaryFromReader(message: PostCreatedResponse, reader: jspb.BinaryReader): PostCreatedResponse;
}

export namespace PostCreatedResponse {
    export type AsObject = {
        message: string,
        postid: number,
    }
}

export class DeletePostRequest extends jspb.Message { 
    getUserid(): number;
    setUserid(value: number): void;

    getPostid(): number;
    setPostid(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeletePostRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeletePostRequest): DeletePostRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeletePostRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeletePostRequest;
    static deserializeBinaryFromReader(message: DeletePostRequest, reader: jspb.BinaryReader): DeletePostRequest;
}

export namespace DeletePostRequest {
    export type AsObject = {
        userid: number,
        postid: number,
    }
}
