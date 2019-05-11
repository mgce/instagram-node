import { Request } from 'express';

export interface RequestWithClaims extends Request{
    claims: object
}