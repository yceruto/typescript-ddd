import { Command } from './command';
import { CommandHandler } from './command-handler';

export type CommandClass<T extends Command> = new (...args: any[]) => T;

export class CommandHandlerRegistry {
  private readonly handlers: Map<string, CommandHandler<Command>> = new Map<string, CommandHandler<Command>>();

  register<T extends Command>(command: CommandClass<T>, handler: CommandHandler<T>): void {
    if (this.handlers.get(command.name)) {
      throw new Error(`Handler for command "${command.name}" is already registered`);    
    }

    this.handlers.set(command.name, handler);
  }

  unregister(command: CommandClass<Command>): void {
    this.handlers.delete(command.name);
  }

  get<T extends Command>(command: T): CommandHandler<T> {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler) {
      throw new Error(`No handler registered for command "${command.constructor.name}"`);    
    }

    return handler;
  }
}