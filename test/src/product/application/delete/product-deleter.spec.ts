import { DomainEventBus } from '@lib/shared/domain/bus/event/domain-event-bus';
import { ProductDeleter } from '../../../../../src/product/application/delete/product-deleter';
import { ProductFinder } from '../../../../../src/product/application/find/product-finder';
import { ProductNotFoundError } from '../../../../../src/product/domain/error/product-not-found-error';
import { Product } from '../../../../../src/product/domain/model/product';
import { ProductId } from '../../../../../src/product/domain/model/product-id';
import { ProductName } from '../../../../../src/product/domain/model/product-name';
import { ProductPrice } from '../../../../../src/product/domain/model/product-price';
import { ProductStock } from '../../../../../src/product/domain/model/product-stock';

describe('ProductDeleter', () => {
  const productId = ProductId.fromString('c6f8cbf4-0d6a-4c2b-9c8a-2a3a2a3a2a3a');

  it('should delete a product', async () => {
    const product = Product.create({
      id: productId,
      name: ProductName.create('Product 1'),
      price: ProductPrice.create(100, 'EUR'),
      stock: ProductStock.create(10),
    });
    const repository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(product)),
      all: jest.fn(),
    };
    const eventBus: DomainEventBus = {
      publish: jest.fn(),
    }
    const finder = new ProductFinder(repository);
    const productDeleter = new ProductDeleter(finder, repository, eventBus);

    await productDeleter.delete(productId);
    expect(repository.ofId).toHaveBeenNthCalledWith(1, productId);
    expect(repository.remove).toHaveBeenNthCalledWith(1, product);
    expect(eventBus.publish).toHaveBeenCalledTimes(1);
  })

  it('should not delete an unknown product', async () => {
    const repository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(null)),
      all: jest.fn(),
    };
    const eventBus: DomainEventBus = {
      publish: jest.fn(),
    }
    const finder = new ProductFinder(repository);
    const productDeleter = new ProductDeleter(finder, repository, eventBus);

    await expect(productDeleter.delete(productId)).rejects.toThrow(new ProductNotFoundError(productId.value));
    expect(repository.remove).not.toHaveBeenCalled();
    expect(eventBus.publish).not.toHaveBeenCalled();
  })
})