import { DomainEventBus } from '@lib/shared/domain/bus/event';
import { CreateProductProps, Product } from '../../domain/model/product';
import { ProductRepository } from '../../domain/repository/product.repository';

export class ProductCreator {
  constructor(
    private readonly repository: ProductRepository,
    private readonly eventBus: DomainEventBus,
  ) {}

  async create(props: CreateProductProps): Promise<Product> {
    const product = Product.create(props);
    await this.repository.add(product);
    this.eventBus.publish(...product.pullEvents());

    return product;
  }
}