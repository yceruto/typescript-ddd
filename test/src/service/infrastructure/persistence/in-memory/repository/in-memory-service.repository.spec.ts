import { Service } from '../../../../../../../src/service/domain/model/service';
import { ServiceFrequency } from '../../../../../../../src/service/domain/model/service-frequency';
import { ServiceId } from '../../../../../../../src/service/domain/model/service-id';
import { ServicePrice } from '../../../../../../../src/service/domain/model/service-price';
import { ServiceTitle } from '../../../../../../../src/service/domain/model/service-title';
import { InMemoryServiceRepository } from '../../../../../../../src/service/infrastructure/persistence/in-memory/repository/in-memory-service.repository';

describe('InMemoryServiceRepository', () => {
  const service = Service.create({
    id: ServiceId.create(),
    name: ServiceTitle.create('Service 1'),
    price: ServicePrice.create(100, 'EUR'),
    frequency: ServiceFrequency.Daily,
  });
  let repository: InMemoryServiceRepository;

  beforeEach(() => {
    repository = new InMemoryServiceRepository([service]);
  })

  it('should add a service', async () => {
    await repository.add(Service.create({
      id: ServiceId.create(),
      name: ServiceTitle.create('Service 2'),
      price: ServicePrice.create(300, 'EUR'),
      frequency: ServiceFrequency.Monthly,
    }));

    expect(await repository.all()).toHaveLength(2);
  })

  it('should not add a service if it already exists', async () => {
    const existingService = Service.create({
      id: service.getId(),
      name: ServiceTitle.create('Service 2'),
      price: ServicePrice.create(300, 'EUR'),
      frequency: ServiceFrequency.Monthly,
    });

    await expect(repository.add(existingService)).rejects.toThrowError('Service already exists');
  })

  it('should remove a service', async () => {
    await repository.remove(service);

    expect(await repository.all()).toHaveLength(0);
  })

  it('should not remove a service if it does not exist', async () => {
    const nonExistingService = Service.create({
      id: ServiceId.create(),
      name: ServiceTitle.create('Service 2'),
      price: ServicePrice.create(300, 'EUR'),
      frequency: ServiceFrequency.Monthly,
    });

    await expect(repository.remove(nonExistingService)).rejects.toThrowError('Service not found');
  })

  it('should find a service by id', async () => {
    expect(await repository.ofId(service.getId())).toEqual(service);
  })

  it('should return undefined if service does not exist', async () => {
    expect(await repository.ofId(ServiceId.create())).toBeUndefined();
  })

  it('should return all services', async () => {
    expect(await repository.all()).toEqual([service]);
  })

  it('should return an empty array if there are no services', async () => {
    repository = new InMemoryServiceRepository();

    expect(await repository.all()).toEqual([]);
  })
})