import { DomainEvent } from '../../../domain/bus/event/domain-event';
import { DomainEventBus } from '../../../domain/bus/event/domain-event-bus';
import { DomainEventSubscriberManager } from '../../../domain/bus/event/domain-event-subscriber-manager';

export class DefaultDomainEventBus implements DomainEventBus {
  constructor(private readonly manager: DomainEventSubscriberManager) {}

  async publish<T extends DomainEvent>(...events: T[]): Promise<void> {
    events.forEach((event) => {
      const subscribers = this.manager.getSubscribers(event);
      subscribers.forEach((subscriber) => subscriber.on(event));
    });
  }
}