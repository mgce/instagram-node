import { Write } from "./write";
import { Read } from "./read";

export interface BaseRepository<T> extends Write<T>, Read<T> {}