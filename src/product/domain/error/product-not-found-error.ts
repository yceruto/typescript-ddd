import { EntityNotFound } from '@lib/shared/domain/error/entity-not-found';

export class ProductNotFoundError extends EntityNotFound {
  constructor(id: string) {
    super(`Product with id ${id} not found`);
  }
}