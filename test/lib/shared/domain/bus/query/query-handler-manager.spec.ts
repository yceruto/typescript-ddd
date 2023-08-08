import { Query } from '@lib/shared/domain/bus/query/query';
import { QueryHandler } from '@lib/shared/domain/bus/query/query-handler';
import { QueryHandlerRegistry } from '@lib/shared/domain/bus/query/query-handler-registry';

describe('QueryHandlerManager', () => {
  let manager: QueryHandlerRegistry;
  class TestQuery1 implements Query {}
  const handler1: QueryHandler<TestQuery1> = {
    handle: jest.fn(),
  }

  beforeEach(() => {
    manager = new QueryHandlerRegistry();
  })

  it('should register and unregister a query handler', () => {
    const query = new TestQuery1();
    manager.register(TestQuery1, handler1);
    expect(manager.get(query)).toBe(handler1);

    manager.unregister(TestQuery1);
    expect(() => manager.get(query)).toThrow(new Error('No handler registered for query "TestQuery1"'));
  })

  it('should throw an error when registering a query handler twice', () => {
    manager.register(TestQuery1, handler1);
    expect(() => manager.register(TestQuery1, handler1)).toThrow(new Error('Handler for query "TestQuery1" is already registered'));
  })
})