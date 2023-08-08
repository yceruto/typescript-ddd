import { CommandAction, Req } from '@lib/shared/presentation/controller';

export class PostShoppingCartAction extends CommandAction {
  method = 'POST';
  path = '/shopping-carts';
  async execute(req: Req): Promise<void> {
    throw new Error('Method not implemented.');
  }
}