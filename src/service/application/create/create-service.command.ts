import { Command } from '@lib/shared/domain/bus/command';
import { ServiceFrequency } from 'src/service/domain/model/service-frequency';

export class CreateServiceCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly priceAmount: number,
    public readonly priceCurrency: string,
    public readonly frequency: ServiceFrequency,
  ) {}
}