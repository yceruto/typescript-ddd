import { DomainEventBus } from '@lib/shared/domain/bus/event/domain-event-bus';
import { ServiceCreator } from '../../../../../src/service/application/create/service-creator';
import { Service } from '../../../../../src/service/domain/model/service';
import { ServiceAvailability } from '../../../../../src/service/domain/model/service-availability';
import { ServiceId } from '../../../../../src/service/domain/model/service-id';
import { ServicePrice } from '../../../../../src/service/domain/model/service-price';
import { ServiceTitle } from '../../../../../src/service/domain/model/service-title';
import { ServiceRepository } from '../../../../../src/service/domain/repository/service.repository';

describe('ServiceCreator', () => {
  const repository: ServiceRepository = {
    add: jest.fn(),
    remove: jest.fn(),
    ofId: jest.fn(),
    all: jest.fn(),
  };
  const eventBus: DomainEventBus = {
    publish: jest.fn(),
  };
  const serviceCreator = new ServiceCreator(repository, eventBus);

  it('should create a service', async () => {
    const service = await serviceCreator.create({
      id: ServiceId.create(),
      name: ServiceTitle.create('Service 1'),
      price: ServicePrice.create(100, 'EUR'),
      availability: ServiceAvailability.create(10),
    });

    expect(service).toBeInstanceOf(Service);
    expect(repository.add).toHaveBeenNthCalledWith(1, service);
    expect(eventBus.publish).toHaveBeenCalledTimes(1);
  });
})