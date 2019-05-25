import { body } from 'express-validator/check';

export const addImageValidator = [
    body('photo').exists(),
]
