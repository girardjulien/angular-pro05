import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moyenne'
})
export class MoyennePipe implements PipeTransform {

  transform(tab: Array<number>): any {
    let sum = tab.reduce((previous, current) => current += previous);
    return sum / tab.length;
  }

}
