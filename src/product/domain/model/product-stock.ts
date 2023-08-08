import { InvariantViolation } from '@lib/shared/domain/error';

export class ProductStock {
  public static create(quantity: number) {
    return new ProductStock(quantity);
  }

  public increase(quantity: number = 1): ProductStock {
    return ProductStock.create(this.quantity + quantity);
  }

  public decrease(quantity: number = 1): ProductStock {
    return ProductStock.create(this.quantity - quantity);
  }

  private constructor(public readonly quantity: number) {
    if (quantity < 0) {
      throw new InvariantViolation('Product stock cannot be less than 0');
    }
  }
}