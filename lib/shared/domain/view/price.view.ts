import { Price } from '../model/price';

export class PriceView {
  /**
   * @minimum 0
   */
  amount: number;

  /**
   * @minLength 3
   * @maxLength 3
   */
  currency: string;

  public static create(price: Price): PriceView {
    return new PriceView(price);
  }

  private constructor(price: Price) {
    this.amount = price.amount;
    this.currency = price.currency;
  }
}