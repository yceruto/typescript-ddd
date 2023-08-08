import { InvariantViolation } from '@lib/shared/domain/error/invariant-violation';
import { Uuid } from '@lib/shared/domain/model/uuid';

const UUID = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

describe('Uuid', () => {
  it('should create a valid Uuid value object', () => {
    const id = Uuid.create();
    expect(id).toBeInstanceOf(Uuid);
    expect(id.value).toHaveLength(36);
    expect(id.value).toMatch(UUID);
  })

  it('should create a valid Uuid from string', () => {
    const id = Uuid.fromString('c6f8cbf4-0d6a-4c2b-9c8a-2a3a2a3a2a3a');
    expect(id).toBeInstanceOf(Uuid);
    expect(id.value).toHaveLength(36);
    expect(id.value).toMatch(UUID);
  })

  it('should throw an error when creating a Uuid from empty string', () => {
    expect(() => Uuid.fromString('')).toThrow(new InvariantViolation('Id cannot be empty'));
  })

  it('should throw an error when creating a Uuid from an invalid UUID string', () => {
    expect(() => Uuid.fromString('c6f8cbf4')).toThrow(new InvariantViolation('Id is not a valid UUID'));
  })
});