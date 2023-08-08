import { DomainError } from '@lib/shared/domain/error';

export class ProductAlreadyExistsError extends DomainError {
  constructor(id: string) {
    super(`Product with id ${id} already exists`);
  }
}