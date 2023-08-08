import { DomainEvent } from '@lib/shared/domain/bus/event/domain-event';
import { DomainEventSubscriber } from '@lib/shared/domain/bus/event/domain-event-subscriber';
import { DomainEventSubscriberManager } from '@lib/shared/domain/bus/event/domain-event-subscriber-manager';
import { DefaultDomainEventBus } from '@lib/shared/infrastructure/bus/event/default-domain-event-bus';
import { randomUUID } from 'crypto';

describe('DefaultDomainEventBus', () => {
  class TestDomainEvent1 extends DomainEvent {}  
  class TestDomainEvent2 extends DomainEvent {}  
  const manager = new DomainEventSubscriberManager();
  const eventBus = new DefaultDomainEventBus(manager);

  it('should publish events to subscribers', async () => {
    const subscriber1: DomainEventSubscriber<TestDomainEvent1> = {
      on: jest.fn(),
    };
    const subscriber2: DomainEventSubscriber<TestDomainEvent1> = {
      on: jest.fn(),
    };
    const subscriber3: DomainEventSubscriber<TestDomainEvent2> = {
      on: jest.fn(),
    };
    const id = randomUUID();
    const event = new TestDomainEvent1(id);
    manager.subscribe(TestDomainEvent1, subscriber1);
    manager.subscribe(TestDomainEvent1, subscriber2);
    manager.subscribe(TestDomainEvent2, subscriber3);
    await eventBus.publish(event);
    
    expect(subscriber1.on).toHaveBeenCalledTimes(1);
    expect(subscriber1.on).toHaveBeenCalledWith(event);
    expect(subscriber2.on).toHaveBeenCalledTimes(1);
    expect(subscriber2.on).toHaveBeenCalledWith(event);
    expect(subscriber3.on).not.toHaveBeenCalled();
  });
})