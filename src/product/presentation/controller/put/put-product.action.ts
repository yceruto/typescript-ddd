import { CommandAction, Req } from '@lib/shared/presentation/controller';
import { JSON } from '@lib/shared/presentation/serializer';
import { UpdateProductCommand } from 'src/product/application/update/update-product.command';
import { ProductView } from 'src/product/domain/view/product.view';
import { PutProductRequest } from './put-product.request';

export class PutProductAction extends CommandAction {
  method = 'PUT';
  path = '/products/:id';
  async execute(req: Req): Promise<ProductView> {
    const payload = JSON.assertParse<PutProductRequest>(req.body);

    return this.commandBus.execute(new UpdateProductCommand(
      req.params.id,
      payload.name,
      payload.price.amount,
      payload.price.currency,
    ));
  }
}