export class ApiResponseMessage{
    data?: object;
    message: string;
    success: boolean;

    constructor(message: string, success: boolean, data?:object){
        this.message = message;
        this.success = success;
        this.data = data;
    }
}