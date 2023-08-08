import { Query } from './query';

export interface QueryBus {
  ask<T extends Query, R = any>(query: T): Promise<R>;
}