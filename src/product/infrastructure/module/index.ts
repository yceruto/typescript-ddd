import { AppModule, commandBus, commandHanderRegistry, domainEventBus, queryBus, queryHandlerRegistry } from '@lib/shared/infrastructure/app';
import { CreateProductCommand } from 'src/product/application/create/create-product.command';
import { CreateProductHandler } from 'src/product/application/create/create-product.handler';
import { ProductCreator } from 'src/product/application/create/product-creator';
import { DeleteProductCommand } from 'src/product/application/delete/delete-product.command';
import { DeleteProductHandler } from 'src/product/application/delete/delete-product.handler';
import { ProductDeleter } from 'src/product/application/delete/product-deleter';
import { FindProductHandler } from 'src/product/application/find/find-product.handler';
import { FindProductQuery } from 'src/product/application/find/find-product.query';
import { FindProductsHandler } from 'src/product/application/find/find-products.handler';
import { FindProductsQuery } from 'src/product/application/find/find-products.query';
import { ProductFinder } from 'src/product/application/find/product-finder';
import { ProductUpdater } from 'src/product/application/update/product-updater';
import { UpdateProductCommand } from 'src/product/application/update/update-product.command';
import { UpdateProductHandler } from 'src/product/application/update/update-product.handler';
import { InMemoryProductRepository } from 'src/product/infrastructure/persistence/in-memory/repository/in-memory-product-repository';
import { GetProductAction } from 'src/product/presentation/controller/get/get-product.action';
import { GetProductsAction } from 'src/product/presentation/controller/get/get-products.action';
import { PostProductAction } from 'src/product/presentation/controller/post/post-product.action';
import { DeleteProductAction } from '../../presentation/controller/delete/delete-product.action';
import { PutProductAction } from '../../presentation/controller/put/put-product.action';

const productRepository = new InMemoryProductRepository();
const productFinder = new ProductFinder(productRepository);

commandHanderRegistry.register(
  CreateProductCommand, 
  new CreateProductHandler(new ProductCreator(productRepository, domainEventBus)),
);

commandHanderRegistry.register(
  DeleteProductCommand,
  new DeleteProductHandler(new ProductDeleter(productFinder, productRepository, domainEventBus)),
);

commandHanderRegistry.register(
  UpdateProductCommand,
  new UpdateProductHandler(new ProductUpdater(productFinder, domainEventBus)),  
);

queryHandlerRegistry.register(
  FindProductQuery,
  new FindProductHandler(productFinder),
);

queryHandlerRegistry.register(
  FindProductsQuery,
  new FindProductsHandler(productFinder),
);

export default new AppModule({
  controllers: [
    new PostProductAction(commandBus),
    new GetProductsAction(queryBus),
    new GetProductAction(queryBus),
    new PutProductAction(commandBus),
    new DeleteProductAction(commandBus),
  ],
});