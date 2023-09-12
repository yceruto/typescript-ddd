import { CommandAction, Req } from '@lib/shared/presentation/controller';
import { DeleteServiceCommand } from 'src/service/application/delete/delete-service.command';

export class DeleteServiceAction extends CommandAction {
  method = 'DELETE';
  path = '/services/:id';
  async execute(req: Req): Promise<void> {
    await this.commandBus.execute(new DeleteServiceCommand(req.params.id));
  }
}