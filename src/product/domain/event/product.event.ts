import { DomainEvent } from '@lib/shared/domain/bus/event';
import { ProductId } from 'src/product/domain/model/product-id';

export abstract class ProductEvent extends DomainEvent {
  constructor(public readonly productId: ProductId) {
    super(productId.value);
  }
}