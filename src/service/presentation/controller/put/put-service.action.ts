import { CommandAction, Req } from '@lib/shared/presentation/controller';
import { JSON } from '@lib/shared/presentation/serializer';
import { UpdateServiceCommand } from 'src/service/application/update/update-service.command';
import { ServiceView } from 'src/service/domain/view/service.view';
import { PutServiceRequest } from './put-service.request';

export class PutServiceAction extends CommandAction {
  method = 'PUT';
  path = '/services/:id';
  async execute(req: Req): Promise<ServiceView> {
    const payload = JSON.assertParse<PutServiceRequest>(req.body);

    return this.commandBus.execute(new UpdateServiceCommand(
      req.params.id,
      payload.name,
      payload.price.amount,
      payload.price.currency,
    ));
  }
}