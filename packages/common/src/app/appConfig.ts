import { RouterConfig } from "./routerConfig";

export interface AppConfig{
    port: number;
    postgres: boolean;
    mongo: boolean;
    di: boolean;
    routes: RouterConfig[]
}