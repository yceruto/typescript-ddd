import { QueryHandler } from '@lib/shared/domain/bus/query';
import { ProductId } from '../../domain/model/product-id';
import { ProductView } from '../../domain/view/product.view';
import { FindProductQuery } from './find-product.query';
import { ProductFinder } from './product-finder';

export class FindProductHandler implements QueryHandler<FindProductQuery> {
  constructor(private readonly finder: ProductFinder) {}

  async handle(query: FindProductQuery): Promise<ProductView> {
    const product = await this.finder.find(ProductId.fromString(query.id));

    return ProductView.create(product);
  }
}