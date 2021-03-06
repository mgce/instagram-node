import { body } from 'express-validator/check';

export const createUserValidator = [
    body('username').exists(),
    body('emailAddress').isEmail().exists(),
    body('password').exists(),
    body('confirmPassword').exists(),
]

export const loginValidator = [
    body('emailAddress').exists().isEmail(),
    body('password').exists()
]