import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: string) {
    debugger;
    if(args != "")
    {
      return value.filter(item => item.title.toLowerCase().includes(args.toLowerCase()));
    }
    else{
      return value;
    }
  }

}
