import { DomainEvent } from './domain-event';

export interface DomainEventSubscriber<T extends DomainEvent> {
  on(event: T): void;
}