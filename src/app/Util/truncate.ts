import { Pipe } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe {
  transform(value: string, args) : string {
    console.log(args);
    let limit = args ? parseInt(args, 10) : 10;
    console.log("limit:", limit);
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}