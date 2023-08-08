import { DomainEventBus } from '@lib/shared/domain/bus/event/domain-event-bus';
import { ProductFinder } from '../../../../../src/product/application/find/product-finder';
import { ProductUpdater } from '../../../../../src/product/application/update/product-updater';
import { ProductNotFoundError } from '../../../../../src/product/domain/error/product-not-found-error';
import { Product } from '../../../../../src/product/domain/model/product';
import { ProductId } from '../../../../../src/product/domain/model/product-id';
import { ProductName } from '../../../../../src/product/domain/model/product-name';
import { ProductPrice } from '../../../../../src/product/domain/model/product-price';
import { ProductStock } from '../../../../../src/product/domain/model/product-stock';
import { ProductRepository } from '../../../../../src/product/domain/repository/product.repository';

describe('ProductUpdater', () => {
  const productId = ProductId.fromString('c6f8cbf4-0d6a-4c2b-9c8a-2a3a2a3a2a3a');
 
  it('should update a product', async () => {
    const product = Product.create({
      id: productId,
      name: ProductName.create('Product 1'),
      price: ProductPrice.create(100, 'EUR'),
      stock: ProductStock.create(10),
    });
    const repository: ProductRepository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(product)),
      all: jest.fn(),
    };
    const eventBus: DomainEventBus = {
      publish: jest.fn(),
    };
    const finder = new ProductFinder(repository);
    const productUpdater = new ProductUpdater(finder, eventBus);

    await productUpdater.update(productId, {
      name: ProductName.create('Product 2'),
      price: ProductPrice.create(200, 'EUR'),
    });

    expect(product.getName().value).toBe('Product 2');
    expect(product.getPrice().amount).toBe(200);
    expect(repository.ofId).toHaveBeenNthCalledWith(1, productId);
    expect(eventBus.publish).toHaveBeenCalledTimes(1);
  })

  it('should not update an unknown product', async () => {
    const repository: ProductRepository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(null)),
      all: jest.fn(),
    };
    const eventBus: DomainEventBus = {
      publish: jest.fn(),
    };
    const finder = new ProductFinder(repository);
    const productUpdater = new ProductUpdater(finder, eventBus);
    const props = {
      name: ProductName.create('Product 2'),
      price: ProductPrice.create(200, 'EUR'),
    };

    await expect(productUpdater.update(productId, props)).rejects.toThrow(new ProductNotFoundError(productId.value));
    expect(eventBus.publish).not.toHaveBeenCalled();
  })
})