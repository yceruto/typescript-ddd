import { ServiceCreatedEvent } from '../../../../../src/service/domain/event/service-created.event';
import { ServiceUpdatedEvent } from '../../../../../src/service/domain/event/service-updated.event';
import { Service } from '../../../../../src/service/domain/model/service';
import { ServiceFrequency } from '../../../../../src/service/domain/model/service-frequency';
import { ServiceId } from '../../../../../src/service/domain/model/service-id';
import { ServicePrice } from '../../../../../src/service/domain/model/service-price';
import { ServiceTitle } from '../../../../../src/service/domain/model/service-title';

describe('Service', () => {
  const service = Service.create({
    id: ServiceId.create(),
    name: ServiceTitle.create('Service 1'),
    price: ServicePrice.create(100, 'USD'),
    frequency: ServiceFrequency.Monthly,
  });

  it('should create a service and push ServiceCreatedEvent', () => {
    expect(service).toBeInstanceOf(Service);
    expect(service.getTitle().value).toBe('Service 1');
    expect(service.getPrice()).toBeInstanceOf(ServicePrice);
    expect(service.getPrice().amount).toBe(100);
    expect(service.getPrice().currency).toBe('USD');
    expect(service.getFrequency()).toBe(ServiceFrequency.Monthly);
    expect(service.getCreatedAt()).toBeInstanceOf(Date);
    expect(service.getUpdatedAt()).toBeUndefined();

    const events = service.pullEvents();

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(ServiceCreatedEvent);
    expect(events[0].occurredOn).toBeInstanceOf(Date);
  })

  it('should update service and push ServiceUpdatedEvent', () => {
    service.update({
      name: ServiceTitle.create('Service 2'),
      price: ServicePrice.create(200, 'EUR'),
    });

    expect(service.getTitle().value).toBe('Service 2');
    expect(service.getPrice().amount).toBe(200);
    expect(service.getPrice().currency).toBe('EUR');
    expect(service.getUpdatedAt()).toBeInstanceOf(Date);

    const events = service.pullEvents();

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(ServiceUpdatedEvent);
    expect(events[0].occurredOn).toBeInstanceOf(Date);
  })
})