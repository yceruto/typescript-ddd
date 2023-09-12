import { QueryHandler } from '@lib/shared/domain/bus/query';
import { ServiceId } from '../../domain/model/service-id';
import { ServiceView } from '../../domain/view/service.view';
import { FindServiceQuery } from './find-service.query';
import { ServiceFinder } from './service-finder';

export class FindServiceHandler implements QueryHandler<FindServiceQuery> {
  constructor(private readonly finder: ServiceFinder) {}

  async handle(query: FindServiceQuery): Promise<ServiceView> {
    const service = await this.finder.find(ServiceId.fromString(query.id));

    return ServiceView.create(service);
  }
}