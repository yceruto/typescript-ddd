import { Product } from '../../../../../src/product/domain/model/product';
import { ProductId } from '../../../../../src/product/domain/model/product-id';
import { ProductName } from '../../../../../src/product/domain/model/product-name';
import { ProductPrice } from '../../../../../src/product/domain/model/product-price';
import { ProductStock } from '../../../../../src/product/domain/model/product-stock';
import { ProductView } from '../../../../../src/product/domain/view/product.view';

describe('ProductView', () => {
  const product1 = Product.create({
    id: ProductId.create(),
    name: ProductName.create('Product 1'),
    price: ProductPrice.create(100, 'USD'),
    stock: ProductStock.create(10),
  });

  const product2 = Product.create({
    id: ProductId.create(),
    name: ProductName.create('Product 2'),
    price: ProductPrice.create(50, 'EUR'),
    stock: ProductStock.create(15),
  });

  it('should create a product view', () => {
    const productView = ProductView.create(product1);

    expect(productView).toBeInstanceOf(ProductView);
    expect(productView.id).toBe(product1.getId().value);
    expect(productView.name).toBe(product1.getName().value);
    expect(productView.price.amount).toBe(product1.getPrice().amount);
    expect(productView.price.currency).toBe(product1.getPrice().currency);
    expect(productView.stock).toBe(product1.getStock().quantity);
  })

  it('should create many product views', () => {
    const productViews = ProductView.createMany([product1, product2]);

    expect(productViews).toHaveLength(2);
    expect(productViews[0]).toBeInstanceOf(ProductView);
    expect(productViews[1]).toBeInstanceOf(ProductView);
  })
})