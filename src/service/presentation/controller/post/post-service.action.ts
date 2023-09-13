import { CommandAction, Req } from '@lib/shared/presentation/controller';
import { JSON } from '@lib/shared/presentation/serializer';
import { CreateServiceCommand } from 'src/service/application/create/create-service.command';
import { ServiceView } from 'src/service/domain/view/service.view';
import { PostServiceRequest } from './post-service.request';

export class PostServiceAction extends CommandAction {
  method = 'POST';
  path = '/services';
  async execute(req: Req): Promise<ServiceView> {
    const payload = JSON.assertParse<PostServiceRequest>(req.body);
  
    return this.commandBus.execute(new CreateServiceCommand(
      payload.id,
      payload.name,
      payload.price.amount,
      payload.price.currency,
      payload.frequency,
    ));
  }
}