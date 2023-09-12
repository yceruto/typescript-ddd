import { DomainEventBus } from '@lib/shared/domain/bus/event';
import { Service, UpdateServiceProps } from '../../domain/model/service';
import { ServiceId } from '../../domain/model/service-id';
import { ServiceFinder } from '../find/service-finder';

export class ServiceUpdater {
  constructor(
    private readonly finder: ServiceFinder,
    private readonly eventBus: DomainEventBus,
  ) {}

  async update(id: ServiceId, props: UpdateServiceProps): Promise<Service> {
    const service = await this.finder.find(id);
    service.update(props);
    this.eventBus.publish(...service.pullEvents());
    return service;
  }
}