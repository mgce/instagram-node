import { App, AppConfig } from '@instagram-node/common';
// import { userRouter } from './routes/user';

const appConfig : AppConfig = {
    port: 5000,
    postgres: false,
    mongo: false,
    di: false,
    routes: []
}

const app = new App(appConfig);

app.listen();