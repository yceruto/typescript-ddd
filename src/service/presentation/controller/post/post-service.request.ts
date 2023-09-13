import { PriceView } from '@lib/shared/domain/view';
import { ServiceFrequency } from 'src/service/domain/model/service-frequency';

export interface PostServiceRequest {
  /**
   * @format uuid
   */
  id: string;

  /**
   * @maxLength 50
   */
  name: string;

  price: PriceView;

  frequency: ServiceFrequency;
}