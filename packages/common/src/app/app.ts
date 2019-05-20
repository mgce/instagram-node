import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import { logger } from '../utils/logger';
import { Server } from 'http';
import { AwilixContainer } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-express';
import { AppConfig } from './appConfig';
import { RouterConfig } from './routerConfig';
import { createPostgresConnection } from '../dataAccess/postgresConnection';
import { Connection } from 'typeorm';

export class App {
    private port: number;
    private app: express.Application;
    constructor(config: AppConfig) {
        this.port = config.port;
        this.app = express();
        this.addCors();
        this.addBodyParser();

        if (config.postgres)
            this.addPostgresDb(config.pgModels);

        if (config.di)
            this.addDi(config.container, config.callerDir);

        this.app.use('/', (req, res) => res.send("service works"));
    }

    /**
     * Start listening on specified port
     */
    public listen(): Server {
        return this.app.listen(this.port, () => {
            logger.info('Server listening on port ' + this.port)
        })
    }
    /**
     * Enable Cross Origin Resource Sharing to all origins by default
     */
    private addCors(): App {
        this.app.use(cors());
        return this;
    }
    /**
     * Middleware that transforms the raw string of req.body into json 
     */
    private addBodyParser(): App {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        return this;
    }



    /**
     * Adding Dependency Injection Container
     * @param objectsToRegister 
     */
    private addDi(container: AwilixContainer, callerDir: string): App {
        this.app.use(scopePerRequest(container));
        this.loadAwilixControllers(callerDir);
        return this;
    }

    private loadAwilixControllers(callerDir: string) {
        this.app.use(loadControllers('./**/*.controller.ts', { cwd: callerDir }))
    }

    /**
     * Adding PostgresDb connection
     */
    private addPostgresDb(pgModels: any[]): App {
        (async () => {
            const conn: Connection = await createPostgresConnection(pgModels);
            // await conn.createQueryRunner().createDatabase('instagram', true);
            console.log("Postgres connected");
        })();

        return this;
    }

}

