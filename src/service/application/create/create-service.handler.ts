import { CommandHandler } from '@lib/shared/domain/bus/command';
import { ServiceView } from 'src/service/domain/view/service.view';
import { ServiceId } from '../../domain/model/service-id';
import { ServicePrice } from '../../domain/model/service-price';
import { ServiceTitle } from '../../domain/model/service-title';
import { CreateServiceCommand } from './create-service.command';
import { ServiceCreator } from './service-creator';

export class CreateServiceHandler implements CommandHandler<CreateServiceCommand> {
  constructor(private readonly creator: ServiceCreator) {}

  async handle(command: CreateServiceCommand): Promise<ServiceView> {   
    const service = await this.creator.create({
      id: ServiceId.fromString(command.id),
      name: ServiceTitle.create(command.name),
      price: ServicePrice.create(command.priceAmount, command.priceCurrency),
      frequency: command.frequency,
    });

    return ServiceView.create(service);
  }
}