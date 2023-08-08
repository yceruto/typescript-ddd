import { QueryAction, Req } from '@lib/shared/presentation/controller';

import { FindProductQuery } from 'src/product/application/find/find-product.query';
import { ProductView } from 'src/product/domain/view/product.view';

export class GetProductAction extends QueryAction {
  method = 'GET';
  path = '/products/:id';
  async execute(req: Req): Promise<ProductView> {
    return this.queryBus.ask(new FindProductQuery(req.params.id));
  }
}