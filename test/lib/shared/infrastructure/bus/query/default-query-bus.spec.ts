import { Query } from '@lib/shared/domain/bus/query/query';
import { QueryHandler } from '@lib/shared/domain/bus/query/query-handler';
import { QueryHandlerRegistry } from '@lib/shared/domain/bus/query/query-handler-registry';
import { DefaultQueryBus } from '@lib/shared/infrastructure/bus/query/default-query-bus';

describe('DefaultQueryBus', () => {
  class TestQuery1 implements Query {}  
  class TestQuery2 implements Query {}  
  const manager = new QueryHandlerRegistry();
  const queryBus = new DefaultQueryBus(manager);
  const handler1: QueryHandler<TestQuery1> = {
    handle: jest.fn().mockReturnValue('test'),
  }

  it('should handle a given query', async () => {
    manager.register(TestQuery1, handler1);
    const query = new TestQuery1();
    const result = await queryBus.ask(query);

    expect(handler1.handle).toHaveBeenCalledWith(query);
    expect(result).toBe('test');
  })

  it('should throw an error when no handler is registered for a given query', () => {
    const query = new TestQuery2();
    expect(() => queryBus.ask(query)).rejects.toThrow(new Error('No handler registered for query "TestQuery2"'));
  })
})