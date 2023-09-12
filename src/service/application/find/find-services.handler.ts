import { QueryHandler } from '@lib/shared/domain/bus/query';
import { ServiceView } from '../../domain/view/service.view';
import { FindServicesQuery } from './find-services.query';
import { ServiceFinder } from './service-finder';

export class FindServicesHandler implements QueryHandler<FindServicesQuery> {
  constructor(private readonly finder: ServiceFinder) {}

  async handle(query: FindServicesQuery): Promise<ServiceView[]> {
    const services = await this.finder.findAll();

    return ServiceView.createMany(services);
  }
}