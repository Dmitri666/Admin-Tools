import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name: 'indexPipe',
  pure: false
})
export class IndexPipe implements PipeTransform {
// Single Argument Filter
  transform(value: any, arg1: any): any {
    return value[arg1];
  }
}
