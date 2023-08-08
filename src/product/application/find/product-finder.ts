import { ProductNotFoundError } from '../../domain/error/product-not-found-error';
import { Product } from '../../domain/model/product';
import { ProductId } from '../../domain/model/product-id';
import { ProductRepository } from '../../domain/repository/product.repository';

export class ProductFinder {
  constructor(private readonly respository: ProductRepository) {}

  async find(id: ProductId): Promise<Product> {
    const product = await this.respository.ofId(id);
    if (!product) {
      throw new ProductNotFoundError(id.value);
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.respository.all();
  }
}