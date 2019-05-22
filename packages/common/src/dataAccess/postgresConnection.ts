import { createConnection, Connection } from "typeorm";

export const createPostgresConnection = (models: any) : Promise<Connection> => {
    let postgresPort;
    if(process.env.PG_PORT !== undefined)
        postgresPort = parseInt(process.env.PG_PORT);
    else
        postgresPort = 54320;
    return createConnection({
        "name":"default",
        "type":"postgres",
        "host":process.env.HOST_ADDRESS || "192.168.0.103",
        "port":postgresPort,
        "username":"postgres",
        "password":"example",
        "database":"instagram",
        "synchronize":true,
        "logging":false,
        "entities":[...models]
    })
}