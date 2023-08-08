import { DomainEvent } from '@lib/shared/domain/bus/event/domain-event';
import { AggregateRoot } from '@lib/shared/domain/model/aggregate-root';

class Entity extends AggregateRoot {
  public static create(id: string): Entity {
    const entity = new Entity(id);
    entity.pushEvent(new DomainEvent(id));

    return entity;
  }

  private constructor(public readonly id: string) {
    super()
  }
}

describe('AggregateRoot', () => {
  it('should create an aggregate root', () => {
    const entity = Entity.create('1')

    expect(entity).toBeInstanceOf(Entity);
  })

  it('should record events and flush after pullEvents() call', () => {
    const entity = Entity.create('1')
    const events = entity.pullEvents();

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(DomainEvent);
    expect(entity.pullEvents()).toHaveLength(0);
  })
})