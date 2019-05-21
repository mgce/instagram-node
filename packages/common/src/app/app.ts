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

        console.log(config);

        if (config.di)
            this.addDi(config.container, config.callerDir);

        // this.app.use('/', (req, res) => res.send("service works"));
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
        console.log("env:" + process.env.NODE_ENV)
        this.app.use(scopePerRequest(container));
        this.loadAwilixControllers(callerDir);
        return this;
    }

    private loadAwilixControllers(callerDir: string) {
        if(process.env.NODE_ENV === "production")
        this.app.use(loadControllers('./**/*.controller.ts', { cwd: callerDir }));
        this.app.use(loadControllers('./**/*.controller.js', { cwd: callerDir }));
    }

    /**
     * Adding PostgresDb connection
     */
    private addPostgresDb(pgModels: any[]): App {
        (async () => {
            console.log(pgModels);
            const conn: Connection = await createPostgresConnection(pgModels.map(model=>model));
            // await conn.createQueryRunner().createDatabase('instagram', true);
            console.log("Postgres connected");
        })();

        return this;
    }

}

