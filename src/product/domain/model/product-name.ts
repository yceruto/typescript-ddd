import { InvariantViolation } from '@lib/shared/domain/error';

export class ProductName {
  public static create(value: string) {
    return new ProductName(value);
  }

  private constructor(public readonly value: string) {
    if (!value) {
      throw new InvariantViolation('Product name cannot be empty');
    }

    if (value.length > 50) {
      throw new InvariantViolation('Product name cannot be longer than 50 characters');
    }
  }
}