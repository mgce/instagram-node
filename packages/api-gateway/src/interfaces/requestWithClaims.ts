import { Request } from 'express';

export interface RequestWithClaims extends Request{
    claims: Claims
}

interface Claims {
    userid:number;
    username:string;
}