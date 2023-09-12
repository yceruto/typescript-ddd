import { InvariantViolation } from '@lib/shared/domain/error/invariant-violation';
import { ServiceTitle } from '../../../../../src/service/domain/model/service-title';

describe('ServiceTitle', () => {
  it('should create a service title', () => {
    const name = ServiceTitle.create('Service 1');
    expect(name).toBeInstanceOf(ServiceTitle);
    expect(name.value).toBe('Service 1');
  })

  it('should throw error when name is empty', () => {
    expect(() => ServiceTitle.create('')).toThrow(new InvariantViolation('Service title cannot be empty'));
  })

  it('should throw error when name is longer than 50 characters', () => {
    expect(() => ServiceTitle.create('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toThrow(new InvariantViolation('Service title cannot be longer than 50 characters'));
  })
})