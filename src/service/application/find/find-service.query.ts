import { Query } from '@lib/shared/domain/bus/query';

export class FindServiceQuery implements Query {
  constructor(public readonly id: string) {}
}