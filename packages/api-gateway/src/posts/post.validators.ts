import { body } from 'express-validator/check';

export const createPostValidator = [
    body('description').exists(),
    body('imageUrl').exists(),
]

export const deletePostValidator = [
    body('postId').exists(),
]
