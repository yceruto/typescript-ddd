import { CommandHandler } from '@lib/shared/domain/bus/command';
import { ProductView } from 'src/product/domain/view/product.view';
import { ProductId } from '../../domain/model/product-id';
import { ProductName } from '../../domain/model/product-name';
import { ProductPrice } from '../../domain/model/product-price';
import { ProductStock } from '../../domain/model/product-stock';
import { CreateProductCommand } from './create-product.command';
import { ProductCreator } from './product-creator';

export class CreateProductHandler implements CommandHandler<CreateProductCommand> {
  constructor(private readonly creator: ProductCreator) {}

  async handle(command: CreateProductCommand): Promise<ProductView> {
    const product = await this.creator.create({
      id: ProductId.fromString(command.id),
      name: ProductName.create(command.name),
      price: ProductPrice.create(command.priceAmount, command.priceCurrency),
      stock: ProductStock.create(command.stock),
    });

    return ProductView.create(product);
  }
}