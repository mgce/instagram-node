export class ApiError extends Error {
    public message: string;
    public success: boolean;
    public error?: object;

    constructor(message: string, error?: object) {
        super();
        this.message = message;
        this.error = error;
        this.success = false;
    }
}