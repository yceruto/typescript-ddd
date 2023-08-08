import { QueryAction } from '@lib/shared/presentation/controller';
import { FindProductsQuery } from 'src/product/application/find/find-products.query';
import { ProductView } from '../../../domain/view/product.view';

export class GetProductsAction extends QueryAction {
  method = 'GET';
  path = '/products';
  async execute(): Promise<ProductView[]> {
    return this.queryBus.ask(new FindProductsQuery());
  }
}