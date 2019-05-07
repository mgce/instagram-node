export { postgresConfig } from './config/postgresConfig';
export { App } from './app/app';
export { AppConfig } from './app/appConfig';
export { RouterConfig } from './app/routerConfig';
export { commonConfig } from './config/commonConfig';
export { BaseEntity } from './domain/baseEntity';
export { logger } from './utils/logger';
export { generateGuid } from './utils/generateGuid';
export { BaseRepository } from './dataAccess/interfaces/baseRepository';

//proto
export { UserService, UserClient } from '../protos/models/user_grpc_pb';
export { CreateUserRequest } from "../protos/models/user_pb";