import { App, AppConfig, commonConfig, createPostgresConnection } from '@instagram-node/common';
import { container } from './container';
import { RefreshTokenModel } from './tokens/refreshToken.model';
require('dotenv').config()

const models = [RefreshTokenModel]

const appConfig: AppConfig = {
    port: commonConfig.ports.apiGateway,
    postgres: false,
    pgModels: models,
    mongo: false,
    di: true,
    container,
    callerDir: __dirname,
}

createPostgresConnection([RefreshTokenModel]).then(connection => {
}).catch(error => {
    console.log(error)
});
const app = new App(appConfig);
app.listen();