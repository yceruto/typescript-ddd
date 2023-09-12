import { Command } from '@lib/shared/domain/bus/command';

export class DeleteServiceCommand implements Command {
  constructor(public readonly id: string) {}
}