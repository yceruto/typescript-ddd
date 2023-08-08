import { PriceView } from '@lib/shared/domain/view';
import { Product } from '../model/product';

export class ProductView {
  /**
   * @format uuid
   */
  public readonly id;
  
  public readonly name: string;
  
  public readonly price: PriceView;

  /**
   * @format date-time
   */
  public readonly createdAt: string;

  /**
   * @format date-time
   */
  public readonly updatedAt?: string;

  /**
   * @minimum 0
   */
  public readonly stock: number;

  public static createMany(products: Product[]): ProductView[] {
    return products.map((product) => ProductView.create(product));
  }

  public static create(product: Product): ProductView {
    return new ProductView(product);
  }

  private constructor(product: Product) {
    this.id = product.getId().value;
    this.name = product.getName().value;
    this.price = PriceView.create(product.getPrice());
    this.stock = product.getStock().quantity;
    this.createdAt = product.getCreatedAt().toISOString();
    this.updatedAt = product.getUpdatedAt()?.toISOString();
  }
}