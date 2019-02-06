import {Pipe, PipeTransform} from '@angular/core';
import filesize from 'filesize/lib/filesize';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  transform(value: any, round = 1): any {
    return filesize(value, {round});
  }
}
