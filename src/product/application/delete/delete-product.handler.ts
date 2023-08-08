import { CommandHandler } from '@lib/shared/domain/bus/command';
import { ProductId } from '../../domain/model/product-id';
import { DeleteProductCommand } from './delete-product.command';
import { ProductDeleter } from './product-deleter';

export class DeleteProductHandler implements CommandHandler<DeleteProductCommand> {
  constructor(private readonly deleter: ProductDeleter) {}

  async handle(command: DeleteProductCommand): Promise<void> {
    await this.deleter.delete(ProductId.fromString(command.id));
  }
}