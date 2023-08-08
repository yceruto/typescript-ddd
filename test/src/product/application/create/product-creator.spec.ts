import { DomainEventBus } from '@lib/shared/domain/bus/event/domain-event-bus';
import { ProductCreator } from '../../../../../src/product/application/create/product-creator';
import { Product } from '../../../../../src/product/domain/model/product';
import { ProductId } from '../../../../../src/product/domain/model/product-id';
import { ProductName } from '../../../../../src/product/domain/model/product-name';
import { ProductPrice } from '../../../../../src/product/domain/model/product-price';
import { ProductStock } from '../../../../../src/product/domain/model/product-stock';
import { ProductRepository } from '../../../../../src/product/domain/repository/product.repository';

describe('ProductCreator', () => {
  const repository: ProductRepository = {
    add: jest.fn(),
    remove: jest.fn(),
    ofId: jest.fn(),
    all: jest.fn(),
  };
  const eventBus: DomainEventBus = {
    publish: jest.fn(),
  };
  const productCreator = new ProductCreator(repository, eventBus);

  it('should create a product', async () => {
    const product = await productCreator.create({
      id: ProductId.create(),
      name: ProductName.create('Product 1'),
      price: ProductPrice.create(100, 'EUR'),
      stock: ProductStock.create(10),
    });

    expect(product).toBeInstanceOf(Product);
    expect(repository.add).toHaveBeenNthCalledWith(1, product);
    expect(eventBus.publish).toHaveBeenCalledTimes(1);
  });
})