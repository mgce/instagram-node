import { App, AppConfig, commonConfig } from '@instagram-node/common';
import { userRouter } from './users/user.routes';
import { tokenRouter } from './tokens/token.routes';
require('dotenv').config()

const appConfig: AppConfig = {
    port: commonConfig.ports.apiGateway,
    postgres: true,
    mongo: false,
    di: false,
    routes: [
        {
            name: '/user',
            router: userRouter
        },
        {
            name: '/token',
            router: tokenRouter
        }
    ]
}

const app = new App(appConfig);

app.listen();