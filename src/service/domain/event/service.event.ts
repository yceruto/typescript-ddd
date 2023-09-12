import { DomainEvent } from '@lib/shared/domain/bus/event';
import { ServiceId } from 'src/service/domain/model/service-id';

export abstract class ServiceEvent extends DomainEvent {
  constructor(public readonly serviceId: ServiceId) {
    super(serviceId.value);
  }
}