import { PriceView } from '@lib/shared/domain/view';

export interface PutServiceRequest {
  /**
   * @maxLength 50
   */
  name: string;

  price: PriceView;
}