import { createPostgresConnection } from "./postgresConnection";

export const connectWithRetry = function connectWithRetry(models:any, callback:Function) {
    return createPostgresConnection(models).then(connection => {
        callback(connection);
    }).catch(error => {
        console.error('Failed to connect to postgres on startup - retrying in 5 sec', error);
        setTimeout(connectWithRetry, 10000, models, callback);
    });
}