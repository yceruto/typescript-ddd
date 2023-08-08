import { IRouter, Protocol } from '0http/common';
import { routes } from '@lib/shared/infrastructure/app';
import { CommandAction } from '@lib/shared/presentation/controller/command.action';
import { QueryAction } from '@lib/shared/presentation/controller/query.action';

export interface AppModuleConfig {
  controllers: (CommandAction | QueryAction)[];
}

export class AppModule {
  public readonly routes = routes();

  constructor(private readonly config: AppModuleConfig) {}

  configureRoutes<P extends Protocol>(router: IRouter<P>): this {
    this.config.controllers.forEach((controller) => {
      router.on(
        controller.method.toUpperCase() as any, 
        controller.path, 
        controller.execute.bind(controller),
      );
    });
    return this;
  }
}