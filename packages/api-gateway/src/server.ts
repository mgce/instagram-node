import { App, AppConfig, commonConfig } from '@instagram-node/common';
import { container } from './container';
require('dotenv').config()

const appConfig: AppConfig = {
    port: commonConfig.ports.apiGateway,
    postgres: true,
    mongo: false,
    di: true,
    container,
    callerDir: __dirname
}

const app = new App(appConfig);

app.listen();