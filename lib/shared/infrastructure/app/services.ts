import { CommandHandlerRegistry } from '@lib/shared/domain/bus/command/command-handler-registry';
import { DomainEventSubscriberManager } from '@lib/shared/domain/bus/event/domain-event-subscriber-manager';
import { QueryHandlerRegistry } from '@lib/shared/domain/bus/query/query-handler-registry';
import { DefaultCommandBus } from '@lib/shared/infrastructure/bus/command/default-command-bus';
import { DefaultDomainEventBus } from '@lib/shared/infrastructure/bus/event/default-domain-event-bus';
import { DefaultQueryBus } from '@lib/shared/infrastructure/bus/query/default-query-bus';

export const commandHanderRegistry = new CommandHandlerRegistry();
export const commandBus = new DefaultCommandBus(commandHanderRegistry);

export const queryHandlerRegistry = new QueryHandlerRegistry();
export const queryBus = new DefaultQueryBus(queryHandlerRegistry);

export const domainEventSubscriberManager = new DomainEventSubscriberManager();
export const domainEventBus = new DefaultDomainEventBus(domainEventSubscriberManager);