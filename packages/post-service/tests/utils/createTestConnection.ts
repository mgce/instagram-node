import { createConnection, Connection } from "typeorm";
import { UserModel } from './../../src/models/user.model';

 export const createTestConnection = () : Promise<Connection> => {
    return createConnection({
        "name":"default",
        "type":"postgres",
        "host":"localhost",
        "port":5432,
        "username":"postgres",
        "password":"",
        "database":"instagram-test",
        "synchronize":true,
        "logging":false,
        "dropSchema": true,
        "entities":["src/models/*.ts", UserModel]
    })
}