import { PriceView } from '@lib/shared/domain/view';

export interface PostProductRequest {
  /**
   * @format uuid
   */
  id: string;

  /**
   * @maxLength 50
   */
  name: string;

  price: PriceView;

  /**
   * @minimum 0
   */
  stock: number;
}