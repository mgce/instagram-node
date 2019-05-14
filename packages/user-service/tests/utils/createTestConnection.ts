import { createConnection, Connection } from "typeorm";

 export const createTestConnection = () : Promise<Connection> => {
    return createConnection({
        "name":"default",
        "type":"postgres",
        "host":"localhost",
        "port":5432,
        "username":"postgres",
        "database":"instagram-test",
        "synchronize":true,
        "logging":false,
        "dropSchema": true,
        "entities":["src/models/*.ts"]
    })
}