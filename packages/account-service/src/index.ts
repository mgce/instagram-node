import { App } from "@instagram-node/common"
import { AccountService } from './service/accountService';
import { asClass } from 'awilix';

const PORT = 3000;

const modulesToRegister = {
    accountService: asClass(AccountService).scoped()    
}

const app = new App(PORT).addBodyParser().addCors().addDi(modulesToRegister).addPostgresDb();

app.listen();