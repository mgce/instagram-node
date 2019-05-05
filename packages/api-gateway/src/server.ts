import { App } from '@instagram-node/common';
import { userRouter } from './routes/user';

const port = 5000;
const app = new App(port).addBodyParser().addCors().addRoute('/users', userRouter);



app.listen();