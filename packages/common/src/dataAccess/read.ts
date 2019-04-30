export interface Read<T> {
    find(filter?: object): Promise<T[]>;
    findOne(id: string): Promise<T>;
  }