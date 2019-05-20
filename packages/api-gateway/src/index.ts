import { App, AppConfig, commonConfig } from '@instagram-node/common';
import { container } from './container';
import { RefreshTokenModel } from './tokens/refreshToken.model';
require('dotenv').config()

const appConfig: AppConfig = {
    port: commonConfig.ports.apiGateway,
    postgres: true,
    mongo: false,
    di: true,
    container,
    callerDir: __dirname,
    pgModels: [RefreshTokenModel]
}

const app = new App(appConfig);

app.listen();