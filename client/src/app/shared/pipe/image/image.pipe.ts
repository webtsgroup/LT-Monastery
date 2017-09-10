import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  pure: false
})
export class ImagePipe implements PipeTransform {

  transform(src: string, mod: string = 'default') {
    let modules = ['default', 'device', 'group', 'program', 'project', 'team', 'user'];
    if (!src) {
      //src = `<%= NO_IMAGE %>/${size}?text=${text}`;
      if (modules.indexOf(mod) !== -1) {
        src = `assets/img/avatar/${mod}.png`;
      } else {
        src = `assets/img/avatar/default.png`;
      }
    }
    return src;
  }
}
