import { CommandAction, Req } from '@lib/shared/presentation/controller';
import { JSON } from '@lib/shared/presentation/serializer';
import { CreateProductCommand } from 'src/product/application/create/create-product.command';
import { ProductView } from 'src/product/domain/view/product.view';
import { PostProductRequest } from './post-product.request';

export class PostProductAction extends CommandAction {
  method = 'POST';
  path = '/products';
  async execute(req: Req): Promise<ProductView> {
    const payload = JSON.assertParse<PostProductRequest>(req.body);
  
    return this.commandBus.execute(new CreateProductCommand(
      payload.id,
      payload.name,
      payload.price.amount,
      payload.price.currency,
      payload.stock,
    ));
  }
}