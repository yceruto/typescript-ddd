import { Command } from '@lib/shared/domain/bus/command';

export class UpdateServiceCommand implements Command {
  constructor(
    public readonly id: string,  
    public readonly name: string,
    public readonly priceAmount: number,
    public readonly priceCurrency: string,
  ) {}
}