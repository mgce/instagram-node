import { Request } from 'express';

export interface RequestWithClaims extends Request{
    claims: Claims
}

interface Claims {
    userId:number;
    username:string;
}