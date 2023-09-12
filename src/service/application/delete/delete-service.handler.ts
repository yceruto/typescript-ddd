import { CommandHandler } from '@lib/shared/domain/bus/command';
import { ServiceId } from '../../domain/model/service-id';
import { DeleteServiceCommand } from './delete-service.command';
import { ServiceDeleter } from './service-deleter';

export class DeleteServiceHandler implements CommandHandler<DeleteServiceCommand> {
  constructor(private readonly deleter: ServiceDeleter) {}

  async handle(command: DeleteServiceCommand): Promise<void> {
    await this.deleter.delete(ServiceId.fromString(command.id));
  }
}