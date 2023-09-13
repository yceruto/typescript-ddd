import { AggregateRoot } from '@lib/shared/domain/model';
import { ServiceCreatedEvent } from '../event/service-created.event';
import { ServiceUpdatedEvent } from '../event/service-updated.event';
import { ServiceFrequency } from './service-frequency';
import { ServiceId } from './service-id';
import { ServicePrice } from './service-price';
import { ServiceTitle } from './service-title';

export interface UpdateServiceProps {
  name: ServiceTitle;
  price: ServicePrice;
}

export interface CreateServiceProps extends UpdateServiceProps {
  id: ServiceId;
  frequency: ServiceFrequency;
}

export class Service extends AggregateRoot {
  public static create(props: CreateServiceProps): Service {
    const service = new Service(
      props.id,
      props.name,
      props.price,
      props.frequency,
      new Date()
    );
    service.pushEvent(new ServiceCreatedEvent(service.id));

    return service;
  }

  public update(props: UpdateServiceProps) {
    this.title = props.name;
    this.price = props.price;
    this.updatedAt = new Date();
    this.pushEvent(new ServiceUpdatedEvent(this.id));
  }

  public getId(): ServiceId {
    return this.id;
  }

  public getTitle(): ServiceTitle {
    return this.title;
  }

  public getPrice(): ServicePrice {
    return this.price;
  }

  public getFrequency(): ServiceFrequency {
    return this.frequency;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  private constructor(
    private readonly id: ServiceId,
    private title: ServiceTitle,
    private price: ServicePrice,
    private frequency: ServiceFrequency,
    private readonly createdAt: Date,
    private updatedAt?: Date,
  ) {
    super();
  }
}