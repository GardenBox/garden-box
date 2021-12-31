import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperFirstLetter'
})
export class UpperFirstLetterPipe implements PipeTransform {

  transform(value: string): unknown {
    const newString = value.charAt(0).toUpperCase() + value.slice(1);

    return newString;
  }

}
