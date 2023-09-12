import { CommandHandler } from '@lib/shared/domain/bus/command';
import { ServiceView } from 'src/service/domain/view/service.view';
import { ServiceId } from '../../domain/model/service-id';
import { ServicePrice } from '../../domain/model/service-price';
import { ServiceTitle } from '../../domain/model/service-title';
import { ServiceUpdater } from './service-updater';
import { UpdateServiceCommand } from './update-service.command';

export class UpdateServiceHandler implements CommandHandler<UpdateServiceCommand> {
  constructor(private readonly updater: ServiceUpdater) {}

  async handle(command: UpdateServiceCommand): Promise<ServiceView> {
    const service = await this.updater.update(ServiceId.fromString(command.id), {
      name: ServiceTitle.create(command.name),
      price: ServicePrice.create(command.priceAmount, command.priceCurrency),
    });

    return ServiceView.create(service);
  }
}