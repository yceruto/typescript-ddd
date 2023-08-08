import { Query } from '../../../domain/bus/query/query';
import { QueryBus } from '../../../domain/bus/query/query-bus';
import { QueryHandlerRegistry } from '../../../domain/bus/query/query-handler-registry';

export class DefaultQueryBus implements QueryBus {
  constructor(private readonly registry: QueryHandlerRegistry) {}

  async ask<T extends Query, R = any>(query: T): Promise<R> {
    return this.registry.get<T>(query).handle(query);
  }
}