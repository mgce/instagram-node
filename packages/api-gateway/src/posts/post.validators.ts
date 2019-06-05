import { body } from 'express-validator/check';

export const createPostValidator = [
    body('description').exists(),
    body('imageId').exists(),
]

export const deletePostValidator = [
    body('postId').exists(),
]
