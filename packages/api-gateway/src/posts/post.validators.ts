import { body, param } from 'express-validator/check';

export const createPostValidator = [
    body('description').exists(),
    body('imageId').exists(),
]

export const postIdExistInBodyValidator = [
    body('postId').exists(),
]

export const postIdExistInParamsValidator = [
    param('postId').exists(),
]

