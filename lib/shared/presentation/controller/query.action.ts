import { QueryBus } from '@lib/shared/domain/bus/query';

export abstract class QueryAction {
  method: string = 'GET';
  path: string = '/';
  constructor(protected readonly queryBus: QueryBus) {}
  abstract execute(req: any, res: any): Promise<any>;
}