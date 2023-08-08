import { CommandAction, Req } from '@lib/shared/presentation/controller';
import { DeleteProductCommand } from 'src/product/application/delete/delete-product.command';

export class DeleteProductAction extends CommandAction {
  method = 'DELETE';
  path = '/products/:id';
  async execute(req: Req): Promise<void> {
    await this.commandBus.execute(new DeleteProductCommand(req.params.id));
  }
}