export class User {
    public username: string;
    public emailAddress: string;
    public password: string;

    constructor(username: string, emailAddress:string, password:string){
        this.username = username;
        this.emailAddress = emailAddress;
        this.password = password;
    }
}