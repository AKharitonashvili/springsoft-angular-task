import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
  standalone: true,
})
export class PhoneNumberPipe implements PipeTransform {
  transform(phoneNumber: string): string {
    if (!phoneNumber) return '';

    const countryCode = phoneNumber.slice(0, 3);
    const part1 = phoneNumber.slice(3, 6);
    const part2 = phoneNumber.slice(6, 9);
    const part3 = phoneNumber.slice(9);

    return `${countryCode} ${part1} ${part2} ${part3}`;
  }
}
