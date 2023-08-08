import { Command } from '@lib/shared/domain/bus/command/command';
import { CommandHandler } from '@lib/shared/domain/bus/command/command-handler';
import { CommandHandlerRegistry } from '@lib/shared/domain/bus/command/command-handler-registry';
import { DefaultCommandBus } from '@lib/shared/infrastructure/bus/command/default-command-bus';

describe('DefaultCommandBus', () => {
  class TestCommand1 implements Command {}  
  class TestCommand2 implements Command {}  
  const manager = new CommandHandlerRegistry();
  const commandBus = new DefaultCommandBus(manager);
  const handler1: CommandHandler<TestCommand1> = {
    handle: jest.fn(),
  }

  it('should execute a given command', async () => {
    const command = new TestCommand1();
    manager.register(TestCommand1, handler1);
    await commandBus.execute(command);

    expect(handler1.handle).toHaveBeenCalledWith(command);
  })

  it('should throw an error when no handler is registered for a given command', () => {
    const command = new TestCommand2();
    expect(() => commandBus.execute(command)).rejects.toThrow(new Error('No handler registered for command "TestCommand2"'));
  })
})