import { Service } from '../../../../domain/model/service';
import { ServiceId } from '../../../../domain/model/service-id';
import { ServiceRepository } from '../../../../domain/repository/service.repository';

export class InMemoryServiceRepository implements ServiceRepository {
  constructor(private readonly services: Service[] = []) {}

  async add(service: Service): Promise<void> {
    const index = this.services.findIndex((p) => p.getId().equals(service.getId()));
    if (index !== -1) {
      throw new Error('Service already exists');
    }
    this.services.push(service);
  }

  async remove(service: Service): Promise<void> {
    const index = this.services.findIndex((p) => p.getId().equals(service.getId()));
    if (index === -1) {
      throw new Error('Service not found');
    }
    this.services.splice(index, 1);
  }

  async ofId(id: ServiceId): Promise<Service | undefined> {
    return this.services.find((p) => p.getId().equals(id));
  }

  async all(): Promise<Service[]> {
    return this.services;
  }
}