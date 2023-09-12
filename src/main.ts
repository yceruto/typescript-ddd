import { App } from '@lib/shared/infrastructure/app';
import { json } from '@lib/shared/infrastructure/app/middleware';
import bookings from './booking/infrastructure/module';
import services from './service/infrastructure/module';

new App()
  .middleware(json)
  .module(services, bookings)
  .start();
