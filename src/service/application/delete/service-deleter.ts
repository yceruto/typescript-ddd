import { DomainEventBus } from '@lib/shared/domain/bus/event';
import { ServiceDeletedEvent } from '../../domain/event/service-deleted.event';
import { ServiceId } from '../../domain/model/service-id';
import { ServiceRepository } from '../../domain/repository/service.repository';
import { ServiceFinder } from '../find/service-finder';

export class ServiceDeleter {
  constructor(
    private readonly finder: ServiceFinder,
    private readonly repository: ServiceRepository,
    private readonly eventBus: DomainEventBus,
  ) {}

  async delete(id: ServiceId): Promise<void> {
    const service = await this.finder.find(id);
    await this.repository.remove(service);
    this.eventBus.publish(new ServiceDeletedEvent(id));
  }
}