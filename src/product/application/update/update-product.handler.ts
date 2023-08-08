import { CommandHandler } from '@lib/shared/domain/bus/command';
import { ProductView } from 'src/product/domain/view/product.view';
import { ProductId } from '../../domain/model/product-id';
import { ProductName } from '../../domain/model/product-name';
import { ProductPrice } from '../../domain/model/product-price';
import { ProductUpdater } from './product-updater';
import { UpdateProductCommand } from './update-product.command';

export class UpdateProductHandler implements CommandHandler<UpdateProductCommand> {
  constructor(private readonly updater: ProductUpdater) {}

  async handle(command: UpdateProductCommand): Promise<ProductView> {
    const product = await this.updater.update(ProductId.fromString(command.id), {
      name: ProductName.create(command.name),
      price: ProductPrice.create(command.priceAmount, command.priceCurrency),
    });

    return ProductView.create(product);
  }
}