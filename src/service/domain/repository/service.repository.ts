import { Service } from '../model/service';
import { ServiceId } from '../model/service-id';

export interface ServiceRepository {
  add(service: Service): Promise<void>;
  remove(service: Service): Promise<void>;
  ofId(id: ServiceId): Promise<Service | undefined>;
  all(): Promise<Service[]>;
}