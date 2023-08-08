import { DomainEventBus } from '@lib/shared/domain/bus/event';
import { ProductDeletedEvent } from '../../domain/event/product-deleted.event';
import { ProductId } from '../../domain/model/product-id';
import { ProductRepository } from '../../domain/repository/product.repository';
import { ProductFinder } from '../find/product-finder';

export class ProductDeleter {
  constructor(
    private readonly finder: ProductFinder,
    private readonly repository: ProductRepository,
    private readonly eventBus: DomainEventBus,
  ) {}

  async delete(id: ProductId): Promise<void> {
    const product = await this.finder.find(id);
    await this.repository.remove(product);
    this.eventBus.publish(new ProductDeletedEvent(id));
  }
}