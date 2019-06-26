import { AwilixContainer } from 'awilix';

export interface AppConfig{
    port: number;
    postgres: boolean;
    mongo: boolean;
    di: boolean;
    pgModels: any[],
    container: AwilixContainer,
    callerDir: string,
    middlewares: any[]
}