import { InvariantViolation } from '@lib/shared/domain/error/invariant-violation';
import { ProductStock } from '../../../../../src/product/domain/model/product-stock';

describe('ProductStock', () => {
  it('should create a product stock', () => {
    const productStock = ProductStock.create(10);
    
    expect(productStock).toBeInstanceOf(ProductStock);
    expect(productStock.quantity).toBe(10);
  })

  it('should increase a product stock', () => {
    const productStock = ProductStock.create(10);
    const increasedProductStock = productStock.increase();
    
    expect(increasedProductStock).toBeInstanceOf(ProductStock);
    expect(increasedProductStock.quantity).toBe(11);
  })

  it('should decrease a product stock', () => {
    const productStock = ProductStock.create(10);
    const decreasedProductStock = productStock.decrease();
    
    expect(decreasedProductStock).toBeInstanceOf(ProductStock);
    expect(decreasedProductStock.quantity).toBe(9);
  })

  it('should throw an error when creating a product stock with a negative quantity', () => {
    expect(() => ProductStock.create(-1)).toThrow(new InvariantViolation('Product stock cannot be less than 0'));
  })

  it('should throw an error when decreasing a product stock with a negative quantity', () => {
    const productStock = ProductStock.create(0);
    
    expect(() => productStock.decrease()).toThrow(new InvariantViolation('Product stock cannot be less than 0'));
    expect(() => productStock.increase(-1)).toThrow(new InvariantViolation('Product stock cannot be less than 0'));
  })
})