import { createConnection, Connection } from "typeorm";

export const createPostgresConnection = (models: any) : Promise<Connection> => {
    let postgresPort;
    if(process.env.PG_PORT !== undefined)
        postgresPort = parseInt(process.env.PG_PORT);
    else
        postgresPort = 5432;
    return createConnection({
        "name":"default",
        "type":"postgres",
        "host":process.env.PG_HOST,
        "port":postgresPort,
        "username":"postgres",
        "password":"example",
        "database":"instagram",
        "synchronize":true,
        "logging":false,
        "dropSchema": true,
        "entities":[...models]
    })
}