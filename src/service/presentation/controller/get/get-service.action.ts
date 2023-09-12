import { QueryAction, Req } from '@lib/shared/presentation/controller';
import { FindServiceQuery } from 'src/service/application/find/find-service.query';
import { ServiceView } from 'src/service/domain/view/service.view';

export class GetServiceAction extends QueryAction {
  method = 'GET';
  path = '/services/:id';
  async execute(req: Req): Promise<ServiceView> {
    return this.queryBus.ask(new FindServiceQuery(req.params.id));
  }
}