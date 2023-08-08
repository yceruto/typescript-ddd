import { Product } from '../model/product';
import { ProductId } from '../model/product-id';

export interface ProductRepository {
  add(product: Product): Promise<void>;
  remove(product: Product): Promise<void>;
  ofId(id: ProductId): Promise<Product | undefined>;
  all(): Promise<Product[]>;
}