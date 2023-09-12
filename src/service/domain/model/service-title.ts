import { InvariantViolation } from '@lib/shared/domain/error';

export class ServiceTitle {
  public static create(value: string) {
    return new ServiceTitle(value);
  }

  private constructor(public readonly value: string) {
    if (!value) {
      throw new InvariantViolation('Service title cannot be empty');
    }

    if (value.length > 50) {
      throw new InvariantViolation('Service title cannot be longer than 50 characters');
    }
  }
}