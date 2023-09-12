import { InvariantViolation } from '@lib/shared/domain/error/invariant-violation';
import { ServiceAvailability } from '../../../../../src/service/domain/model/service-availability';

describe('ServiceAvailability', () => {
  it('should create a service availability', () => {
    const serviceAvailability = ServiceAvailability.create(10);
    
    expect(serviceAvailability).toBeInstanceOf(ServiceAvailability);
    expect(serviceAvailability.quantity).toBe(10);
  })

  it('should increase a service availability', () => {
    const serviceAvailability = ServiceAvailability.create(10);
    const increasedServiceAvailability = serviceAvailability.increase();
    
    expect(increasedServiceAvailability).toBeInstanceOf(ServiceAvailability);
    expect(increasedServiceAvailability.quantity).toBe(11);
  })

  it('should decrease a service availability', () => {
    const serviceAvailability = ServiceAvailability.create(10);
    const decreasedServiceAvailability = serviceAvailability.decrease();
    
    expect(decreasedServiceAvailability).toBeInstanceOf(ServiceAvailability);
    expect(decreasedServiceAvailability.quantity).toBe(9);
  })

  it('should throw an error when creating a service availability with a negative quantity', () => {
    expect(() => ServiceAvailability.create(-1)).toThrow(new InvariantViolation('Service availability cannot be less than 0'));
  })

  it('should throw an error when decreasing a service availability with a negative quantity', () => {
    const serviceAvailability = ServiceAvailability.create(0);
    
    expect(() => serviceAvailability.decrease()).toThrow(new InvariantViolation('Service availability cannot be less than 0'));
    expect(() => serviceAvailability.increase(-1)).toThrow(new InvariantViolation('Service availability cannot be less than 0'));
  })
})