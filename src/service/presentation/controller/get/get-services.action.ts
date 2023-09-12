import { QueryAction } from '@lib/shared/presentation/controller';
import { FindServicesQuery } from 'src/service/application/find/find-services.query';
import { ServiceView } from '../../../domain/view/service.view';

export class GetServicesAction extends QueryAction {
  method = 'GET';
  path = '/services';
  async execute(): Promise<ServiceView[]> {
    return this.queryBus.ask(new FindServicesQuery());
  }
}