import { body } from 'express-validator/check';

export const addImageValidator = [
    body('data').exists(),
    body('name').exists(),
]
