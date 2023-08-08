import { InvariantViolation } from '../error/invariant-violation';

export class Price {
  public static create(amount: number, currency: string): Price {
    return new this(amount, currency.toUpperCase());
  }

  public sum(price: Price): Price {
    if (this.currency !== price.currency) {
      throw new InvariantViolation('Cannot sum prices with different currencies');
    }

    return Price.create(this.amount + price.amount, this.currency);
  }

  public subtract(price: Price): Price {
    if (this.currency !== price.currency) {
      throw new InvariantViolation('Cannot subtract prices with different currencies');
    }

    return Price.create(this.amount - price.amount, this.currency);
  }

  protected constructor(
    public readonly amount: number, 
    public readonly currency: string,
  ) {
    if (amount < 0) {
      throw new InvariantViolation('Price cannot be negative');
    }

    if (!currency) {
      throw new InvariantViolation('Price currency cannot be empty');
    }

    if (currency.length !== 3) {
      throw new InvariantViolation('Price currency must have 3 characters');
    }
  }
}