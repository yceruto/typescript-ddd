import { ServiceFinder } from '../../../../../src/service/application/find/service-finder';
import { ServiceNotFoundError } from '../../../../../src/service/domain/error/service-not-found-error';
import { Service } from '../../../../../src/service/domain/model/service';
import { ServiceFrequency } from '../../../../../src/service/domain/model/service-frequency';
import { ServiceId } from '../../../../../src/service/domain/model/service-id';
import { ServicePrice } from '../../../../../src/service/domain/model/service-price';
import { ServiceTitle } from '../../../../../src/service/domain/model/service-title';
import { ServiceRepository } from '../../../../../src/service/domain/repository/service.repository';

describe('ServiceFinder', () => {
  const serviceId = ServiceId.fromString('c6f8cbf4-0d6a-4c2b-9c8a-2a3a2a3a2a3a');

  it('should find a service', async () => {
    const repository: ServiceRepository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(Service.create({
        id: serviceId,
        name: ServiceTitle.create('Service 1'),
        price: ServicePrice.create(100, 'EUR'),
        frequency: ServiceFrequency.Daily,
      }))),
      all: jest.fn(),
    };
    const serviceFinder = new ServiceFinder(repository);
    const service = await serviceFinder.find(serviceId);

    expect(service).toBeInstanceOf(Service);
    expect(repository.ofId).toHaveBeenNthCalledWith(1, serviceId);
  })

  it('should not find an unknown service', async () => {
    const repository: ServiceRepository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(null)),
      all: jest.fn(),
    };
    const serviceFinder = new ServiceFinder(repository);

    await expect(serviceFinder.find(serviceId)).rejects.toThrow(new ServiceNotFoundError(serviceId.value));
    expect(repository.ofId).toHaveBeenNthCalledWith(1, serviceId);
  })

  it('should find all services', async () => {
    const repository: ServiceRepository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn(),
      all: jest.fn().mockReturnValue(Promise.resolve([
        Service.create({
          id: ServiceId.create(),
          name: ServiceTitle.create('Service 1'),
          price: ServicePrice.create(100, 'EUR'),
          frequency: ServiceFrequency.Daily,
        }),
        Service.create({
          id: ServiceId.create(),
          name: ServiceTitle.create('Service 2'),
          price: ServicePrice.create(200, 'EUR'),
          frequency: ServiceFrequency.Monthly,
        }),
      ])),
    };
    const serviceFinder = new ServiceFinder(repository);
    const services = await serviceFinder.findAll();

    expect(services).toHaveLength(2);
    expect(repository.all).toHaveBeenCalledTimes(1);
  })
})