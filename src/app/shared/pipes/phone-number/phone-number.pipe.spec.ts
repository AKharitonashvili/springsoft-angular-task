import { PhoneNumberPipe } from './phone-number.pipe';

describe('PhoneNumberPipe', () => {
  let pipe: PhoneNumberPipe;

  beforeEach(() => {
    pipe = new PhoneNumberPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a phone number correctly', () => {
    const phoneNumber = '123456789012';
    const formatted = pipe.transform(phoneNumber);
    expect(formatted).toBe('123 456 789 012');
  });

  it('should handle phone number with fewer than expected digits', () => {
    const phoneNumber = '123456';
    const formatted = pipe.transform(phoneNumber);
    expect(formatted).toBe('123 456');
  });

  it('should return an empty string when phoneNumber is null', () => {
    const formatted = pipe.transform(null as unknown as string);
    expect(formatted).toBe('');
  });

  it('should return an empty string when phoneNumber is an empty string', () => {
    const formatted = pipe.transform('');
    expect(formatted).toBe('');
  });

  it('should handle phone number with more than expected digits', () => {
    const phoneNumber = '123456789012345';
    const formatted = pipe.transform(phoneNumber);
    expect(formatted).toBe('123 456 789 012345');
  });
});
