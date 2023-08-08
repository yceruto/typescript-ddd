import { Query } from '@lib/shared/domain/bus/query';

export class FindProductQuery implements Query {
  constructor(public readonly id: string) {}
}