import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgurUrl',
  standalone: true,
})
export class ImgurUrlPipe implements PipeTransform {
  transform(value: string): unknown {
    return value.replace('imgur', 'i.imgur') + '.png';
  }
}
