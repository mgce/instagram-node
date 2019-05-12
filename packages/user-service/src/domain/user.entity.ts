export class User {
    public username: string;
    public emailAddress: string;
    public salt: string;
    public password: string;

    constructor(username: string, emailAddress: string, salt: string, password: string) {
        this.username = username;
        this.emailAddress = emailAddress;
        this.salt = salt;
        this.password = password;
    }
}