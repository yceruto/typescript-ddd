import { InvariantViolation } from '@lib/shared/domain/error';

export class ServiceAvailability {
  public static create(quantity: number) {
    return new ServiceAvailability(quantity);
  }

  public increase(quantity: number = 1): ServiceAvailability {
    return ServiceAvailability.create(this.quantity + quantity);
  }

  public decrease(quantity: number = 1): ServiceAvailability {
    return ServiceAvailability.create(this.quantity - quantity);
  }

  private constructor(public readonly quantity: number) {
    if (quantity < 0) {
      throw new InvariantViolation('Service availability cannot be less than 0');
    }
  }
}