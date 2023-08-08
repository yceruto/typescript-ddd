import { InvariantViolation } from '@lib/shared/domain/error/invariant-violation';
import { Price } from '@lib/shared/domain/model/price';

describe('Price', () => {
  it('should create a price', () => {
    const price = Price.create(100, 'EUR');
    expect(price).toBeInstanceOf(Price);
    expect(price.amount).toBe(100);
    expect(price.currency).toBe('EUR');
  })

  it('should throw error when price is negative', () => {
    expect(() => Price.create(-1, 'EUR')).toThrow(new InvariantViolation('Price cannot be negative'));
  })

  it('should throw error when currency is empty', () => {
    expect(() => Price.create(100, '')).toThrow(new InvariantViolation('Price currency cannot be empty'));
  })

  it('should throw error when currency is not 3 characters long', () => {
    expect(() => Price.create(100, 'EU')).toThrow(new InvariantViolation('Price currency must have 3 characters'));
  })
})