import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffle'
})
export class ShufflePipe implements PipeTransform {

  transform(data: any[]): any[] {
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
    return data;
  }

}
