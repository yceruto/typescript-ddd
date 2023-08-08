import { Query } from './query';

export interface QueryHandler<T extends Query, R = any> {
  handle(query: T): Promise<R>;
}