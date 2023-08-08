import { Command } from './command';

export interface CommandBus {
  execute<T extends Command>(command: T): Promise<void | any>;
}