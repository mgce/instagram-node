import { createConnection, Connection } from "typeorm";

export const createPostgresConnection = (models: any) : Promise<Connection> => {
    return createConnection({
        "name":"default",
        "type":"postgres",
        "host":"",
        "port":54320,
        "username":"postgres",
        "password":"example",
        "database":"instagram",
        "synchronize":true,
        "logging":false,
        "dropSchema": true,
        "entities":["src/models/*.ts"]
    })
}