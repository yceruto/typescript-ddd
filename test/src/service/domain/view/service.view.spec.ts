import { Service } from '../../../../../src/service/domain/model/service';
import { ServiceAvailability } from '../../../../../src/service/domain/model/service-availability';
import { ServiceId } from '../../../../../src/service/domain/model/service-id';
import { ServicePrice } from '../../../../../src/service/domain/model/service-price';
import { ServiceTitle } from '../../../../../src/service/domain/model/service-title';
import { ServiceView } from '../../../../../src/service/domain/view/service.view';

describe('ServiceView', () => {
  const service1 = Service.create({
    id: ServiceId.create(),
    name: ServiceTitle.create('Service 1'),
    price: ServicePrice.create(100, 'USD'),
    availability: ServiceAvailability.create(10),
  });

  const service2 = Service.create({
    id: ServiceId.create(),
    name: ServiceTitle.create('Service 2'),
    price: ServicePrice.create(50, 'EUR'),
    availability: ServiceAvailability.create(15),
  });

  it('should create a service view', () => {
    const serviceView = ServiceView.create(service1);

    expect(serviceView).toBeInstanceOf(ServiceView);
    expect(serviceView.id).toBe(service1.getId().value);
    expect(serviceView.name).toBe(service1.getTitle().value);
    expect(serviceView.price.amount).toBe(service1.getPrice().amount);
    expect(serviceView.price.currency).toBe(service1.getPrice().currency);
    expect(serviceView.availability).toBe(service1.getAvailability().quantity);
  })

  it('should create many service views', () => {
    const serviceViews = ServiceView.createMany([service1, service2]);

    expect(serviceViews).toHaveLength(2);
    expect(serviceViews[0]).toBeInstanceOf(ServiceView);
    expect(serviceViews[1]).toBeInstanceOf(ServiceView);
  })
})