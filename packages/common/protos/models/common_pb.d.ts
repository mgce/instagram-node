// package: common
// file: common.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

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

export class DateDto extends jspb.Message { 
    getYear(): number;
    setYear(value: number): void;

    getMonth(): number;
    setMonth(value: number): void;

    getDay(): number;
    setDay(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DateDto.AsObject;
    static toObject(includeInstance: boolean, msg: DateDto): DateDto.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DateDto, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DateDto;
    static deserializeBinaryFromReader(message: DateDto, reader: jspb.BinaryReader): DateDto;
}

export namespace DateDto {
    export type AsObject = {
        year: number,
        month: number,
        day: number,
    }
}
