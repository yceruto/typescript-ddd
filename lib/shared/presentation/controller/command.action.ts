import { CommandBus } from '@lib/shared/domain/bus/command';

export abstract class CommandAction {
  method: string = 'POST';
  path: string = '/';
  constructor(protected readonly commandBus: CommandBus) {}
  abstract execute(req: any, res: any): Promise<void | any>;
}