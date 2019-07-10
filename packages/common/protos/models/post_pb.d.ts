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

    getAuthorid(): number;
    setAuthorid(value: number): void;

    getImageid(): string;
    setImageid(value: string): void;

    getDescription(): string;
    setDescription(value: string): void;


    hasDatecreated(): boolean;
    clearDatecreated(): void;
    getDatecreated(): common_pb.DateDto | undefined;
    setDatecreated(value?: common_pb.DateDto): void;

    getLikescount(): number;
    setLikescount(value: number): void;

    getCommentscount(): number;
    setCommentscount(value: number): void;

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
        authorid: number,
        imageid: string,
        description: string,
        datecreated?: common_pb.DateDto.AsObject,
        likescount: number,
        commentscount: number,
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

export class SearchByTagRequest extends jspb.Message { 
    getTag(): string;
    setTag(value: string): void;

    getUserid(): number;
    setUserid(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchByTagRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SearchByTagRequest): SearchByTagRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchByTagRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchByTagRequest;
    static deserializeBinaryFromReader(message: SearchByTagRequest, reader: jspb.BinaryReader): SearchByTagRequest;
}

export namespace SearchByTagRequest {
    export type AsObject = {
        tag: string,
        userid: number,
    }
}

export class SearchByTagResponse extends jspb.Message { 
    clearPostsList(): void;
    getPostsList(): Array<PostDto>;
    setPostsList(value: Array<PostDto>): void;
    addPosts(value?: PostDto, index?: number): PostDto;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchByTagResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SearchByTagResponse): SearchByTagResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchByTagResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchByTagResponse;
    static deserializeBinaryFromReader(message: SearchByTagResponse, reader: jspb.BinaryReader): SearchByTagResponse;
}

export namespace SearchByTagResponse {
    export type AsObject = {
        postsList: Array<PostDto.AsObject>,
    }
}

export class GetUserPostsRequest extends jspb.Message { 
    getUserid(): number;
    setUserid(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserPostsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserPostsRequest): GetUserPostsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserPostsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserPostsRequest;
    static deserializeBinaryFromReader(message: GetUserPostsRequest, reader: jspb.BinaryReader): GetUserPostsRequest;
}

export namespace GetUserPostsRequest {
    export type AsObject = {
        userid: number,
    }
}

export class GetUserPostsResponse extends jspb.Message { 
    clearPostsList(): void;
    getPostsList(): Array<PostDto>;
    setPostsList(value: Array<PostDto>): void;
    addPosts(value?: PostDto, index?: number): PostDto;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserPostsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserPostsResponse): GetUserPostsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserPostsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserPostsResponse;
    static deserializeBinaryFromReader(message: GetUserPostsResponse, reader: jspb.BinaryReader): GetUserPostsResponse;
}

export namespace GetUserPostsResponse {
    export type AsObject = {
        postsList: Array<PostDto.AsObject>,
    }
}
