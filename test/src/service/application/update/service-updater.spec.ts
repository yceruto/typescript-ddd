import { DomainEventBus } from '@lib/shared/domain/bus/event/domain-event-bus';
import { ServiceFinder } from '../../../../../src/service/application/find/service-finder';
import { ServiceUpdater } from '../../../../../src/service/application/update/service-updater';
import { ServiceNotFoundError } from '../../../../../src/service/domain/error/service-not-found-error';
import { Service } from '../../../../../src/service/domain/model/service';
import { ServiceAvailability } from '../../../../../src/service/domain/model/service-availability';
import { ServiceId } from '../../../../../src/service/domain/model/service-id';
import { ServicePrice } from '../../../../../src/service/domain/model/service-price';
import { ServiceTitle } from '../../../../../src/service/domain/model/service-title';
import { ServiceRepository } from '../../../../../src/service/domain/repository/service.repository';

describe('ServiceUpdater', () => {
  const serviceId = ServiceId.fromString('c6f8cbf4-0d6a-4c2b-9c8a-2a3a2a3a2a3a');
 
  it('should update a service', async () => {
    const service = Service.create({
      id: serviceId,
      name: ServiceTitle.create('Service 1'),
      price: ServicePrice.create(100, 'EUR'),
      availability: ServiceAvailability.create(10),
    });
    const repository: ServiceRepository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(service)),
      all: jest.fn(),
    };
    const eventBus: DomainEventBus = {
      publish: jest.fn(),
    };
    const finder = new ServiceFinder(repository);
    const serviceUpdater = new ServiceUpdater(finder, eventBus);

    await serviceUpdater.update(serviceId, {
      name: ServiceTitle.create('Service 2'),
      price: ServicePrice.create(200, 'EUR'),
    });

    expect(service.getTitle().value).toBe('Service 2');
    expect(service.getPrice().amount).toBe(200);
    expect(repository.ofId).toHaveBeenNthCalledWith(1, serviceId);
    expect(eventBus.publish).toHaveBeenCalledTimes(1);
  })

  it('should not update an unknown service', async () => {
    const repository: ServiceRepository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(null)),
      all: jest.fn(),
    };
    const eventBus: DomainEventBus = {
      publish: jest.fn(),
    };
    const finder = new ServiceFinder(repository);
    const serviceUpdater = new ServiceUpdater(finder, eventBus);
    const props = {
      name: ServiceTitle.create('Service 2'),
      price: ServicePrice.create(200, 'EUR'),
    };

    await expect(serviceUpdater.update(serviceId, props)).rejects.toThrow(new ServiceNotFoundError(serviceId.value));
    expect(eventBus.publish).not.toHaveBeenCalled();
  })
})