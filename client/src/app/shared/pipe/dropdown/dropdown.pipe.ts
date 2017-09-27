import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'dropdown'
})
export class DropdownPipe implements PipeTransform {

  constructor() {}

  transform(data: any, field: string = 'name', value: string = 'id') {
    if (data) {
      data.map((item: any) => {
        item['value'] = item[value] ? item[value] : item.id;
        item['label'] = item[field] ? item[field] : '';
        return item;
      });
    }
    return data;
  }
}
