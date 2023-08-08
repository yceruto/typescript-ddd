import { InvariantViolation } from '@lib/shared/domain/error/invariant-violation';
import { ProductName } from '../../../../../src/product/domain/model/product-name';

describe('ProductName', () => {
  it('should create a product name', () => {
    const name = ProductName.create('Product 1');
    expect(name).toBeInstanceOf(ProductName);
    expect(name.value).toBe('Product 1');
  })

  it('should throw error when name is empty', () => {
    expect(() => ProductName.create('')).toThrow(new InvariantViolation('Product name cannot be empty'));
  })

  it('should throw error when name is longer than 50 characters', () => {
    expect(() => ProductName.create('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toThrow(new InvariantViolation('Product name cannot be longer than 50 characters'));
  })
})