import { Pipe, PipeTransform } from '@angular/core';
import { filesize } from 'filesize';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  transform(value: any, round = 1, standard = 'jedec', base = 2): any {
    return filesize(value, { round, base, standard });
  }
}
