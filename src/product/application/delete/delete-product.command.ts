import { Command } from '@lib/shared/domain/bus/command';

export class DeleteProductCommand implements Command {
  constructor(public readonly id: string) {}
}