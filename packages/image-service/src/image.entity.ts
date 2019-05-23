import { IsNotEmpty } from "class-validator";

export class Image{
    @IsNotEmpty()
    data: any;
    @IsNotEmpty()
    name: string;

    constructor(data: any, name: string){
        this.data = data;
        this.name = name;
    }
}