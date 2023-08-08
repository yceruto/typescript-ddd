import { ProductCreatedEvent } from '../../../../../src/product/domain/event/product-created.event';
import { ProductUpdatedEvent } from '../../../../../src/product/domain/event/product-updated.event';
import { Product } from '../../../../../src/product/domain/model/product';
import { ProductId } from '../../../../../src/product/domain/model/product-id';
import { ProductName } from '../../../../../src/product/domain/model/product-name';
import { ProductPrice } from '../../../../../src/product/domain/model/product-price';
import { ProductStock } from '../../../../../src/product/domain/model/product-stock';

describe('Product', () => {
  const product = Product.create({
    id: ProductId.create(),
    name: ProductName.create('Product 1'),
    price: ProductPrice.create(100, 'USD'),
    stock: ProductStock.create(10),
  });

  it('should create a product and push ProductCreatedEvent', () => {
    expect(product).toBeInstanceOf(Product);
    expect(product.getName().value).toBe('Product 1');
    expect(product.getPrice()).toBeInstanceOf(ProductPrice);
    expect(product.getPrice().amount).toBe(100);
    expect(product.getPrice().currency).toBe('USD');
    expect(product.getStock().quantity).toBe(10);
    expect(product.getCreatedAt()).toBeInstanceOf(Date);
    expect(product.getUpdatedAt()).toBeUndefined();

    const events = product.pullEvents();

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(ProductCreatedEvent);
    expect(events[0].occurredOn).toBeInstanceOf(Date);
  })

  it('should update product and push ProductUpdatedEvent', () => {
    product.update({
      name: ProductName.create('Product 2'),
      price: ProductPrice.create(200, 'EUR'),
    });

    expect(product.getName().value).toBe('Product 2');
    expect(product.getPrice().amount).toBe(200);
    expect(product.getPrice().currency).toBe('EUR');
    expect(product.getUpdatedAt()).toBeInstanceOf(Date);

    const events = product.pullEvents();

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(ProductUpdatedEvent);
    expect(events[0].occurredOn).toBeInstanceOf(Date);
  })
})