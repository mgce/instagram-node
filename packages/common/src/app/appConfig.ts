import { AwilixContainer } from 'awilix';

export interface AppConfig{
    port: number;
    postgres: boolean;
    mongo: boolean;
    di: boolean;
    container: AwilixContainer,
    callerDir: string
}