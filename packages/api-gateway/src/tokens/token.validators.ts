import { body } from "express-validator/check";

export const authenticateValidator = [
    body('emailAddress').exists().isEmail(),
    body('password').exists()
]