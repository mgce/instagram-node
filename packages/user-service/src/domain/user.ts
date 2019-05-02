export class User {
    public username: string;
    public emailAddress: string;
    public hashedPassword: string;

    constructor(username: string, emailAddress:string, hashedPassword:string){
        this.username = username;
        this.emailAddress = emailAddress;
        this.hashedPassword = hashedPassword;
    }
}