import { randomUUID } from 'crypto';
import { InvariantViolation } from '../error/invariant-violation';

const UUID = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export class Uuid {
  public static create(): Uuid {
    return new this(randomUUID());
  }

  public static fromString(value: string): Uuid {
    return new this(value);
  }

  equals(other: Uuid): boolean {
    return this.value === other.value;
  }

  protected constructor(public readonly value: string) {
    if (!value) {
      throw new InvariantViolation('Id cannot be empty');
    }

    if (!UUID.test(value)) {
      throw new InvariantViolation('Id is not a valid UUID');
    }
  }
}