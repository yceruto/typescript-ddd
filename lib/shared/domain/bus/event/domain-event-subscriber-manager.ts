import { DomainEvent } from './domain-event';
import { DomainEventSubscriber } from './domain-event-subscriber';

export type DomainEventClass<T extends DomainEvent> = new (...args: any[]) => T;

export class DomainEventSubscriberManager {
  private readonly map: Map<string, DomainEventSubscriber<DomainEvent>[]> = new Map();

  subscribe<T extends DomainEvent>(event: DomainEventClass<T>, subscriber: DomainEventSubscriber<T>): void {
    const subscribers = this.map.get(event.name) || [];
    if (subscribers.includes(subscriber)) {
      return;
    }
    subscribers.push(subscriber);
    this.map.set(event.name, subscribers);
  }

  unsubscribe<T extends DomainEvent>(event: DomainEventClass<T>, subscriber: DomainEventSubscriber<T>): void {
    const subscribers = this.map.get(event.name) || [];
    this.map.set(event.name, subscribers.filter((s) => s !== subscriber));
  }

  getSubscribers<T extends DomainEvent>(event: T): DomainEventSubscriber<T>[] {
    return this.map.get(event.constructor.name) || [];
  }
}