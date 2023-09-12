import { ServiceNotFoundError } from '../../domain/error/service-not-found-error';
import { Service } from '../../domain/model/service';
import { ServiceId } from '../../domain/model/service-id';
import { ServiceRepository } from '../../domain/repository/service.repository';

export class ServiceFinder {
  constructor(private readonly respository: ServiceRepository) {}

  async find(id: ServiceId): Promise<Service> {
    const service = await this.respository.ofId(id);
    if (!service) {
      throw new ServiceNotFoundError(id.value);
    }

    return service;
  }

  async findAll(): Promise<Service[]> {
    return await this.respository.all();
  }
}