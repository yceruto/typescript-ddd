import { PriceView } from '@lib/shared/domain/view';

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

  availability: number;
}