export interface Write<T> {
    create(item: T): Promise<void>;
    update(item: T): Promise<void>;
    delete(id: string): Promise<void>;
  }