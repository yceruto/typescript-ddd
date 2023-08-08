import { PriceView } from '@lib/shared/domain/view';

export interface PutProductRequest {
  /**
   * @maxLength 50
   */
  name: string;

  price: PriceView;
}