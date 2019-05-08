import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';

export function requestValidator(req: Request, res: Response, next: Function) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    next()
}