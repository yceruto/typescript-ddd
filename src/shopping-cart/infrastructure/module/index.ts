import { AppModule, commandBus } from '@lib/shared/infrastructure/app';
import { PostShoppingCartAction } from '../../presentation/controller/post/post-shopping-cart.action';

export default new AppModule({
  controllers: [new PostShoppingCartAction(commandBus)],
});