import { DomainEventBus } from '@lib/shared/domain/bus/event';
import { CreateServiceProps, Service } from '../../domain/model/service';
import { ServiceRepository } from '../../domain/repository/service.repository';

export class ServiceCreator {
  constructor(
    private readonly repository: ServiceRepository,
    private readonly eventBus: DomainEventBus,
  ) {}

  async create(props: CreateServiceProps): Promise<Service> {
    const service = Service.create(props);
    await this.repository.add(service);
    this.eventBus.publish(...service.pullEvents());

    return service;
  }
}