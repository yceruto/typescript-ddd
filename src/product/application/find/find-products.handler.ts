import { QueryHandler } from '@lib/shared/domain/bus/query';
import { ProductView } from '../../domain/view/product.view';
import { FindProductsQuery } from './find-products.query';
import { ProductFinder } from './product-finder';

export class FindProductsHandler implements QueryHandler<FindProductsQuery> {
  constructor(private readonly finder: ProductFinder) {}

  async handle(query: FindProductsQuery): Promise<ProductView[]> {
    const products = await this.finder.findAll();

    return ProductView.createMany(products);
  }
}