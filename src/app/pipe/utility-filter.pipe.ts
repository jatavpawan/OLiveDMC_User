import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utilityFilter'
})
export class UtilityFilterPipe implements PipeTransform {

  transform(value: any, args: string) {
    debugger;
    if(args != "")
    {
      return value.filter(item => item.utilityType.toLowerCase().includes(args.toLowerCase()));
    }
    else{
      return value;
    }
  }
}
