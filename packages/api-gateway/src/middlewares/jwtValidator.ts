import { Response } from 'express';
import jwt from 'jsonwebtoken'
import { RequestWithClaims } from '../interfaces/requestWithClaims';

export function authOnly(req: RequestWithClaims, res: Response, next: Function) {
    let token = req.headers['authorization'];

    if (!token)
        return res.json(invalidToken)

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    const secret = process.env.JWT_SECRET;
    if (secret === undefined)
        return res.json(invalidToken)

    jwt.verify(token, secret, (err: jwt.VerifyErrors, decoded: any) => {
        if (err) {
            return res.status(401).json(invalidToken);
        } else {
            req.claims = decoded;
            next();
        }
    });

}

const invalidToken = {
    success: false,
    message: 'Token is not valid'
}