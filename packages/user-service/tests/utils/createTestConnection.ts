import { createConnection, Connection } from "typeorm";
import { UserModel, UserFollowingModel } from "../../src/dataAccess";


 export const createTestConnection = () : Promise<Connection> => {
    return createConnection({
        "name":"default",
        "type":"postgres",
        "host":"localhost",
        "port":5432,
        "username":"postgres",
        "password":"Mateusz11",
        "database":"instagram-test",
        "synchronize":true,
        "logging":false,
        "dropSchema": true,
        "entities":["src/dataAccess/models/*.ts", UserModel, UserFollowingModel]
    })
}