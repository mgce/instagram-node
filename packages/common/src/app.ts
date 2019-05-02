import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import { logger } from './utils/logger';
import { Server } from 'http';
import {createContainer} from 'awilix';
import {scopePerRequest} from 'awilix-express';
import pg from 'pg';
import { createConnection } from 'net';
import { pgConfig } from './config/pgconfig';

export class App {
    private port: number;
    private app: express.Application;
    constructor(port: number) {
        this.port = port;
        this.app = express.application;
    }

    /**
     * Start listening on specified port
     */
    public listen() : Server {
        return this.app.listen(this.port, () => {
            logger.info('Server listening on port ' + this.port)
        })
    }
    /**
     * Enable Cross Origin Resource Sharing to all origins by default
     */
    public addCors(): App {
        this.app.use(cors());
        return this;
    }
    /**
     * Middleware that transforms the raw string of req.body into json 
     */
    public addBodyParser(): App {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        return this;
    }

    /**
     * Adding mongoDb support
     * @param url Url to your mongo database
     */
    public addMongo(url: string): App {
        mongoose.Promise = global.Promise;
        mongoose.connect(url);
        return this;
    }

    /**
     * Adding Dependency Injection Container
     * @param objectsToRegister 
     */
    public addDi(objectsToRegister:any):App{
        const container = createContainer();
        container.register(objectsToRegister);
        this.app.use(scopePerRequest(container));
        return this;
    }

    /**
     * Adding PostgresDb connection
     */
    public addPostgresDb(): App{
        createConnection(pgConfig)
        return this;
    }
}