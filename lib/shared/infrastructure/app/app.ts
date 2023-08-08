import zero, { IBuildServerAndRouterConfig } from '0http';
import { IRouter, Protocol, RequestHandler, Server } from '0http/common';
import { AppModule } from '@lib/shared/infrastructure/app/module';

export class App<P extends Protocol = Protocol.HTTP> {
  public readonly router: IRouter<P>;
  public readonly server: Server<P>;
  private readonly modules: AppModule[] = [];

  constructor(config?: IBuildServerAndRouterConfig<P, Server<P>, IRouter<P>>) {
    const { router, server } = zero<P>(config);
    this.router = router;
    this.server = server;
  }

  middleware(...handlers: RequestHandler<P>[]): this {
    this.router.use(...handlers);
    return this;
  }

  module(...modules: AppModule[]): this {
    this.modules.push(...modules);
    return this;
  }

  start(port: number = 3000): void {
    this.modules.forEach((module) => module.configureRoutes<P>(this.router));
    this.server.listen(port);
    console.log(`Server listening on port ${port}`);
  }
}