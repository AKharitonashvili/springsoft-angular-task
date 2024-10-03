import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
  standalone: true,
})
export class PhoneNumberPipe implements PipeTransform {
  transform(phoneNumber: string): string {
    if (!phoneNumber) return '';

    const countryCode = phoneNumber.slice(0, 4);
    const part1 = phoneNumber.slice(4, 7);
    const part2 = phoneNumber.slice(7, 10);
    const part3 = phoneNumber.slice(10);

    return `${countryCode} ${part1} ${part2} ${part3}`;
  }
}
