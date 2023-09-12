import { CommandAction, Req } from '@lib/shared/presentation/controller';

export class PostBookingAction extends CommandAction {
  method = 'POST';
  path = '/bookings';
  async execute(req: Req): Promise<void> {
    throw new Error('Method not implemented.');
  }
}