import { DomainEventBus } from '@lib/shared/domain/bus/event/domain-event-bus';
import { ServiceDeleter } from '../../../../../src/service/application/delete/service-deleter';
import { ServiceFinder } from '../../../../../src/service/application/find/service-finder';
import { ServiceNotFoundError } from '../../../../../src/service/domain/error/service-not-found-error';
import { Service } from '../../../../../src/service/domain/model/service';
import { ServiceFrequency } from '../../../../../src/service/domain/model/service-frequency';
import { ServiceId } from '../../../../../src/service/domain/model/service-id';
import { ServicePrice } from '../../../../../src/service/domain/model/service-price';
import { ServiceTitle } from '../../../../../src/service/domain/model/service-title';

describe('ServiceDeleter', () => {
  const serviceId = ServiceId.fromString('c6f8cbf4-0d6a-4c2b-9c8a-2a3a2a3a2a3a');

  it('should delete a service', async () => {
    const service = Service.create({
      id: serviceId,
      name: ServiceTitle.create('Service 1'),
      price: ServicePrice.create(100, 'EUR'),
      frequency: ServiceFrequency.Daily,
    });
    const repository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(service)),
      all: jest.fn(),
    };
    const eventBus: DomainEventBus = {
      publish: jest.fn(),
    }
    const finder = new ServiceFinder(repository);
    const serviceDeleter = new ServiceDeleter(finder, repository, eventBus);

    await serviceDeleter.delete(serviceId);
    expect(repository.ofId).toHaveBeenNthCalledWith(1, serviceId);
    expect(repository.remove).toHaveBeenNthCalledWith(1, service);
    expect(eventBus.publish).toHaveBeenCalledTimes(1);
  })

  it('should not delete an unknown service', async () => {
    const repository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(null)),
      all: jest.fn(),
    };
    const eventBus: DomainEventBus = {
      publish: jest.fn(),
    }
    const finder = new ServiceFinder(repository);
    const serviceDeleter = new ServiceDeleter(finder, repository, eventBus);

    await expect(serviceDeleter.delete(serviceId)).rejects.toThrow(new ServiceNotFoundError(serviceId.value));
    expect(repository.remove).not.toHaveBeenCalled();
    expect(eventBus.publish).not.toHaveBeenCalled();
  })
})