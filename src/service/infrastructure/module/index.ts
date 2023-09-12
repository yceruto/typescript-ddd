import { AppModule, commandBus, commandHanderRegistry, domainEventBus, queryBus, queryHandlerRegistry } from '@lib/shared/infrastructure/app';
import { CreateServiceCommand } from 'src/service/application/create/create-service.command';
import { CreateServiceHandler } from 'src/service/application/create/create-service.handler';
import { ServiceCreator } from 'src/service/application/create/service-creator';
import { DeleteServiceCommand } from 'src/service/application/delete/delete-service.command';
import { DeleteServiceHandler } from 'src/service/application/delete/delete-service.handler';
import { ServiceDeleter } from 'src/service/application/delete/service-deleter';
import { FindServiceHandler } from 'src/service/application/find/find-service.handler';
import { FindServiceQuery } from 'src/service/application/find/find-service.query';
import { FindServicesHandler } from 'src/service/application/find/find-services.handler';
import { FindServicesQuery } from 'src/service/application/find/find-services.query';
import { ServiceFinder } from 'src/service/application/find/service-finder';
import { ServiceUpdater } from 'src/service/application/update/service-updater';
import { UpdateServiceCommand } from 'src/service/application/update/update-service.command';
import { UpdateServiceHandler } from 'src/service/application/update/update-service.handler';
import { InMemoryServiceRepository } from 'src/service/infrastructure/persistence/in-memory/repository/in-memory-service.repository';
import { GetServiceAction } from 'src/service/presentation/controller/get/get-service.action';
import { GetServicesAction } from 'src/service/presentation/controller/get/get-services.action';
import { PostServiceAction } from 'src/service/presentation/controller/post/post-service.action';
import { DeleteServiceAction } from '../../presentation/controller/delete/delete-service.action';
import { PutServiceAction } from '../../presentation/controller/put/put-service.action';

const serviceRepository = new InMemoryServiceRepository();
const serviceFinder = new ServiceFinder(serviceRepository);

commandHanderRegistry.register(
  CreateServiceCommand, 
  new CreateServiceHandler(new ServiceCreator(serviceRepository, domainEventBus)),
);

commandHanderRegistry.register(
  DeleteServiceCommand,
  new DeleteServiceHandler(new ServiceDeleter(serviceFinder, serviceRepository, domainEventBus)),
);

commandHanderRegistry.register(
  UpdateServiceCommand,
  new UpdateServiceHandler(new ServiceUpdater(serviceFinder, domainEventBus)),  
);

queryHandlerRegistry.register(
  FindServiceQuery,
  new FindServiceHandler(serviceFinder),
);

queryHandlerRegistry.register(
  FindServicesQuery,
  new FindServicesHandler(serviceFinder),
);

export default new AppModule({
  controllers: [
    new PostServiceAction(commandBus),
    new GetServicesAction(queryBus),
    new GetServiceAction(queryBus),
    new PutServiceAction(commandBus),
    new DeleteServiceAction(commandBus),
  ],
});