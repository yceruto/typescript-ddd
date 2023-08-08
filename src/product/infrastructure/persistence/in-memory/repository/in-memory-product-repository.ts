import { Product } from '../../../../domain/model/product';
import { ProductId } from '../../../../domain/model/product-id';
import { ProductRepository } from '../../../../domain/repository/product.repository';

export class InMemoryProductRepository implements ProductRepository {
  constructor(private readonly products: Product[] = []) {}

  async add(product: Product): Promise<void> {
    const index = this.products.findIndex((p) => p.getId().equals(product.getId()));
    if (index !== -1) {
      throw new Error('Product already exists');
    }
    this.products.push(product);
  }

  async remove(product: Product): Promise<void> {
    const index = this.products.findIndex((p) => p.getId().equals(product.getId()));
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
  }

  async ofId(id: ProductId): Promise<Product | undefined> {
    return this.products.find((p) => p.getId().equals(id));
  }

  async all(): Promise<Product[]> {
    return this.products;
  }
}