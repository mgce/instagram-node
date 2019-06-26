// package: grpc.post.v1
// file: post.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";

export class PostDto extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getAuthor(): string;
    setAuthor(value: string): void;

    getImageid(): string;
    setImageid(value: string): void;

    getDescription(): string;
    setDescription(value: string): void;


    hasDatecreated(): boolean;
    clearDatecreated(): void;
    getDatecreated(): common_pb.DateDto | undefined;
    setDatecreated(value?: common_pb.DateDto): void;

    getLikes(): number;
    setLikes(value: number): void;

    getLiked(): boolean;
    setLiked(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PostDto.AsObject;
    static toObject(includeInstance: boolean, msg: PostDto): PostDto.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PostDto, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PostDto;
    static deserializeBinaryFromReader(message: PostDto, reader: jspb.BinaryReader): PostDto;
}

export namespace PostDto {
    export type AsObject = {
        id: number,
        author: string,
        imageid: string,
        description: string,
        datecreated?: common_pb.DateDto.AsObject,
        likes: number,
        liked: boolean,
    }
}

export class CreatePostRequest extends jspb.Message { 
    getUserid(): number;
    setUserid(value: number): void;

    getUsername(): string;
    setUsername(value: string): void;

    getImageid(): string;
    setImageid(value: string): void;

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
        username: string,
        imageid: string,
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

export class GetPostsRequest extends jspb.Message { 
    getUserid(): number;
    setUserid(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetPostsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetPostsRequest): GetPostsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetPostsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetPostsRequest;
    static deserializeBinaryFromReader(message: GetPostsRequest, reader: jspb.BinaryReader): GetPostsRequest;
}

export namespace GetPostsRequest {
    export type AsObject = {
        userid: number,
    }
}

export class GetPostsResponse extends jspb.Message { 
    clearPostsList(): void;
    getPostsList(): Array<PostDto>;
    setPostsList(value: Array<PostDto>): void;
    addPosts(value?: PostDto, index?: number): PostDto;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetPostsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetPostsResponse): GetPostsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetPostsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetPostsResponse;
    static deserializeBinaryFromReader(message: GetPostsResponse, reader: jspb.BinaryReader): GetPostsResponse;
}

export namespace GetPostsResponse {
    export type AsObject = {
        postsList: Array<PostDto.AsObject>,
    }
}
