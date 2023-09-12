import { EntityNotFound } from '@lib/shared/domain/error/entity-not-found';

export class ServiceNotFoundError extends EntityNotFound {
  constructor(id: string) {
    super(`Service with id ${id} not found`);
  }
}