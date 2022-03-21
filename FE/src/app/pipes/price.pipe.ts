import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
}
