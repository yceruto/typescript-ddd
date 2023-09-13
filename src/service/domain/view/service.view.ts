import { PriceView } from '@lib/shared/domain/view';
import { Service } from '../model/service';

export class ServiceView {
  /**
   * @format uuid
   */
  public readonly id;
  
  public readonly name: string;
  
  public readonly price: PriceView;

  /**
   * @format date-time
   */
  public readonly createdAt: string;

  /**
   * @format date-time
   */
  public readonly updatedAt?: string;

  public readonly frequency: string;

  public static createMany(services: Service[]): ServiceView[] {
    return services.map((service) => ServiceView.create(service));
  }

  public static create(service: Service): ServiceView {
    return new ServiceView(service);
  }

  private constructor(service: Service) {
    this.id = service.getId().value;
    this.name = service.getTitle().value;
    this.price = PriceView.create(service.getPrice());
    this.frequency = service.getFrequency().toString();
    this.createdAt = service.getCreatedAt().toISOString();
    this.updatedAt = service.getUpdatedAt()?.toISOString();
  }
}