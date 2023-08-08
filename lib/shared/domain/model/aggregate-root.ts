import { DomainEvent } from '../bus/event/domain-event';

export class AggregateRoot {
  private domainEvents: DomainEvent[] = [];

  public pullEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  protected pushEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }
}