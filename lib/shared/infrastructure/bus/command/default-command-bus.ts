import { Command } from '../../../domain/bus/command/command';
import { CommandBus } from '../../../domain/bus/command/command-bus';
import { CommandHandlerRegistry } from '../../../domain/bus/command/command-handler-registry';

export class DefaultCommandBus implements CommandBus {
  constructor(private readonly registry: CommandHandlerRegistry) {}

  async execute<T extends Command>(command: T): Promise<void | any> {
    return this.registry.get<T>(command).handle(command);
  }
}