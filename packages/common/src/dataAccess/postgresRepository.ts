import { BaseRepository } from './interfaces/baseRepository';
import { getRepository, Entity, Repository } from 'typeorm';
export abstract class PostgresRepository<T extends typeof Entity> implements BaseRepository<T>{

    private repository: Repository<T>

    constructor(entity: typeof Entity) {
        this.repository = getRepository(entity)
    }
    create(item: T): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(item: T): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(filter?: object | undefined): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }


}
