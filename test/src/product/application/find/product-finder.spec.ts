import { ProductFinder } from '../../../../../src/product/application/find/product-finder';
import { ProductNotFoundError } from '../../../../../src/product/domain/error/product-not-found-error';
import { Product } from '../../../../../src/product/domain/model/product';
import { ProductId } from '../../../../../src/product/domain/model/product-id';
import { ProductName } from '../../../../../src/product/domain/model/product-name';
import { ProductPrice } from '../../../../../src/product/domain/model/product-price';
import { ProductStock } from '../../../../../src/product/domain/model/product-stock';
import { ProductRepository } from '../../../../../src/product/domain/repository/product.repository';

describe('ProductFinder', () => {
  const productId = ProductId.fromString('c6f8cbf4-0d6a-4c2b-9c8a-2a3a2a3a2a3a');

  it('should find a product', async () => {
    const repository: ProductRepository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(Product.create({
        id: productId,
        name: ProductName.create('Product 1'),
        price: ProductPrice.create(100, 'EUR'),
        stock: ProductStock.create(10),
      }))),
      all: jest.fn(),
    };
    const productFinder = new ProductFinder(repository);
    const product = await productFinder.find(productId);

    expect(product).toBeInstanceOf(Product);
    expect(repository.ofId).toHaveBeenNthCalledWith(1, productId);
  })

  it('should not find an unknown product', async () => {
    const repository: ProductRepository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn().mockReturnValue(Promise.resolve(null)),
      all: jest.fn(),
    };
    const productFinder = new ProductFinder(repository);

    await expect(productFinder.find(productId)).rejects.toThrow(new ProductNotFoundError(productId.value));
    expect(repository.ofId).toHaveBeenNthCalledWith(1, productId);
  })

  it('should find all products', async () => {
    const repository: ProductRepository = {
      add: jest.fn(),
      remove: jest.fn(),
      ofId: jest.fn(),
      all: jest.fn().mockReturnValue(Promise.resolve([
        Product.create({
          id: ProductId.create(),
          name: ProductName.create('Product 1'),
          price: ProductPrice.create(100, 'EUR'),
          stock: ProductStock.create(10),
        }),
        Product.create({
          id: ProductId.create(),
          name: ProductName.create('Product 2'),
          price: ProductPrice.create(200, 'EUR'),
          stock: ProductStock.create(20),
        }),
      ])),
    };
    const productFinder = new ProductFinder(repository);
    const products = await productFinder.findAll();

    expect(products).toHaveLength(2);
    expect(repository.all).toHaveBeenCalledTimes(1);
  })
})