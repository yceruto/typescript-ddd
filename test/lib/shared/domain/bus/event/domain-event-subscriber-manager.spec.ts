import { DomainEvent } from '@lib/shared/domain/bus/event/domain-event';
import { DomainEventSubscriber } from '@lib/shared/domain/bus/event/domain-event-subscriber';
import { DomainEventSubscriberManager } from '@lib/shared/domain/bus/event/domain-event-subscriber-manager';
import { randomUUID } from 'crypto';

describe('DomainEventSubscriberManager', () => {
  const id = randomUUID();
  class TestDomainEvent extends DomainEvent {}  
  const subscriber1: DomainEventSubscriber<TestDomainEvent> = {
    on: jest.fn(),
  };
  const subscriber2: DomainEventSubscriber<TestDomainEvent> = {
    on: jest.fn(),
  };
  let manager: DomainEventSubscriberManager;

  beforeEach(() => {
    manager = new DomainEventSubscriberManager();
  })

  it('should subscribe to a given event', () => {
    const event = new TestDomainEvent(id);
    manager.subscribe(TestDomainEvent, subscriber1);
    manager.subscribe(TestDomainEvent, subscriber2);
    const subscribers = manager.getSubscribers(event);

    expect(subscribers).toHaveLength(2);
    expect(subscribers).toContain(subscriber1);
    expect(subscribers).toContain(subscriber2);
  })

  it('should not subscribe to the same event twice', () => {
    const event = new TestDomainEvent(id);
    manager.subscribe(TestDomainEvent, subscriber1);
    manager.subscribe(TestDomainEvent, subscriber1);
    const subscribers = manager.getSubscribers(event);

    expect(subscribers).toHaveLength(1);
  })

  it('should unsubscribe to a given event', () => {
    const event = new TestDomainEvent(id);
    manager.subscribe(TestDomainEvent, subscriber1);
    manager.subscribe(TestDomainEvent, subscriber2);
    manager.unsubscribe(TestDomainEvent, subscriber1);
    const subscribers = manager.getSubscribers(event);

    expect(subscribers).toHaveLength(1);
    expect(subscribers).toContain(subscriber2);
  })
})