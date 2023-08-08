export class DomainEvent {
  public readonly occurredOn: Date = new Date();
  constructor(public readonly aggregateId: string) {}
}