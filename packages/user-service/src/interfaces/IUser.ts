export interface IUser {
    id?:number;
    username: string;
    emailAddress: string;
    salt: string;
    password: string;
}