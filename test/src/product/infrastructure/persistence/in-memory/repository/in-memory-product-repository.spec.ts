import { Product } from '../../../../../../../src/product/domain/model/product';
import { ProductId } from '../../../../../../../src/product/domain/model/product-id';
import { ProductName } from '../../../../../../../src/product/domain/model/product-name';
import { ProductPrice } from '../../../../../../../src/product/domain/model/product-price';
import { ProductStock } from '../../../../../../../src/product/domain/model/product-stock';
import { InMemoryProductRepository } from '../../../../../../../src/product/infrastructure/persistence/in-memory/repository/in-memory-product-repository';

describe('InMemoryProductRepository', () => {
  const product = Product.create({
    id: ProductId.create(),
    name: ProductName.create('Product 1'),
    price: ProductPrice.create(100, 'EUR'),
    stock: ProductStock.create(10),
  });
  let repository: InMemoryProductRepository;

  beforeEach(() => {
    repository = new InMemoryProductRepository([product]);
  })

  it('should add a product', async () => {
    await repository.add(Product.create({
      id: ProductId.create(),
      name: ProductName.create('Product 2'),
      price: ProductPrice.create(300, 'EUR'),
      stock: ProductStock.create(40),
    }));

    expect(await repository.all()).toHaveLength(2);
  })

  it('should not add a product if it already exists', async () => {
    const existingProduct = Product.create({
      id: product.getId(),
      name: ProductName.create('Product 2'),
      price: ProductPrice.create(300, 'EUR'),
      stock: ProductStock.create(40),
    });

    await expect(repository.add(existingProduct)).rejects.toThrowError('Product already exists');
  })

  it('should remove a product', async () => {
    await repository.remove(product);

    expect(await repository.all()).toHaveLength(0);
  })

  it('should not remove a product if it does not exist', async () => {
    const nonExistingProduct = Product.create({
      id: ProductId.create(),
      name: ProductName.create('Product 2'),
      price: ProductPrice.create(300, 'EUR'),
      stock: ProductStock.create(40),
    });

    await expect(repository.remove(nonExistingProduct)).rejects.toThrowError('Product not found');
  })

  it('should find a product by id', async () => {
    expect(await repository.ofId(product.getId())).toEqual(product);
  })

  it('should return undefined if product does not exist', async () => {
    expect(await repository.ofId(ProductId.create())).toBeUndefined();
  })

  it('should return all products', async () => {
    expect(await repository.all()).toEqual([product]);
  })

  it('should return an empty array if there are no products', async () => {
    repository = new InMemoryProductRepository();

    expect(await repository.all()).toEqual([]);
  })
})