import { App } from '@lib/shared/infrastructure/app';
import { json } from '@lib/shared/infrastructure/app/middleware';
import products from './product/infrastructure/module';
import shoppingCarts from './shopping-cart/infrastructure/module';

new App()
  .middleware(json)
  .module(products, shoppingCarts)
  .start();
