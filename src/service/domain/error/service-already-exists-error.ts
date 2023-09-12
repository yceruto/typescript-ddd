import { DomainError } from '@lib/shared/domain/error';

export class ServiceAlreadyExistsError extends DomainError {
  constructor(id: string) {
    super(`Service with id ${id} already exists`);
  }
}