import { DomainEventBus } from '@lib/shared/domain/bus/event';
import { Product, UpdateProductProps } from '../../domain/model/product';
import { ProductId } from '../../domain/model/product-id';
import { ProductFinder } from '../find/product-finder';

export class ProductUpdater {
  constructor(
    private readonly finder: ProductFinder,
    private readonly eventBus: DomainEventBus,
  ) {}

  async update(id: ProductId, props: UpdateProductProps): Promise<Product> {
    const product = await this.finder.find(id);
    product.update(props);
    this.eventBus.publish(...product.pullEvents());
    return product;
  }
}