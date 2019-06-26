import express = require("express");
import { ApiError } from "../interfaces/apiError";

export const sendErrorResponse = (res: express.Response, err?: object, msg?: string) => {
    res.status(400)
    const message = msg || 'Error occured';
    const error = new ApiError(message, err)
    res.send(error);
}