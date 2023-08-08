import { DomainEvent } from './domain-event';

export interface DomainEventBus {
  publish<T extends DomainEvent>(...events: T[]): Promise<void>;
}