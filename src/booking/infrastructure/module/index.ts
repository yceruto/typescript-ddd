import { AppModule, commandBus } from '@lib/shared/infrastructure/app';
import { PostBookingAction } from '../../presentation/controller/post/post-booking.action';

export default new AppModule({
  controllers: [new PostBookingAction(commandBus)],
});