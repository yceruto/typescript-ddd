import { Command } from '@lib/shared/domain/bus/command/command';
import { CommandHandler } from '@lib/shared/domain/bus/command/command-handler';
import { CommandHandlerRegistry } from '@lib/shared/domain/bus/command/command-handler-registry';

describe('CommandHandlerManager', () => {
  let manager: CommandHandlerRegistry;
  class TestCommand1 implements Command {}
  const handler1: CommandHandler<TestCommand1> = {
    handle: jest.fn(),
  }

  beforeEach(() => {
    manager = new CommandHandlerRegistry();
  })

  it('should register and unregister a command handler', () => {
    const command = new TestCommand1();
    manager.register(TestCommand1, handler1);
    expect(manager.get(command)).toBe(handler1);

    manager.unregister(TestCommand1);
    expect(() => manager.get(command)).toThrow(new Error('No handler registered for command "TestCommand1"'));
  })

  it('should throw an error when registering a command handler twice', () => {
    manager.register(TestCommand1, handler1);
    expect(() => manager.register(TestCommand1, handler1)).toThrow(new Error('Handler for command "TestCommand1" is already registered'));
  })
})