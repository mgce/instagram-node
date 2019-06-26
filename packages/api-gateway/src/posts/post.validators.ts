import { body } from 'express-validator/check';

export const createPostValidator = [
    body('description').exists(),
    body('imageId').exists(),
]

export const postIdExistValidator = [
    body('postId').exists(),
]

