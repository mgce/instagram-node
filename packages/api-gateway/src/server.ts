import { App, AppConfig, commonConfig } from '@instagram-node/common';
import { userRouter } from './users/user.routes';
require('dotenv').config()

const appConfig: AppConfig = {
    port: commonConfig.ports.apiGateway,
    postgres: false,
    mongo: false,
    di: false,
    routes: [
        {
            name: '/user',
            router: userRouter
        }
    ]
}

const app = new App(appConfig);

app.listen();