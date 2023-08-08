import { Query } from './query';
import { QueryHandler } from './query-handler';

export type QueryClass<T extends Query> = new (...args: any[]) => T;

export class QueryHandlerRegistry {
  private readonly handlers: Map<string, QueryHandler<Query>> = new Map<string, QueryHandler<Query>>();

  register<T extends Query>(query: QueryClass<T>, handler: QueryHandler<T>): void {
    if (this.handlers.get(query.name)) {
      throw new Error(`Handler for query "${query.name}" is already registered`);    
    }

    this.handlers.set(query.name, handler);
  }

  unregister(query: QueryClass<Query>): void {
    this.handlers.delete(query.name);
  }

  get<T extends Query>(query: T): QueryHandler<T> {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler) {
      throw new Error(`No handler registered for query "${query.constructor.name}"`);    
    }

    return handler;
  }
}