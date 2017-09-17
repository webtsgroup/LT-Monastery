import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';
const apiBaseUrl = `${environment.apiBaseUrl}`;

@Pipe({
  name: 'image',
  pure: false
})
export class ImagePipe implements PipeTransform {

  transform(src: string, mod: string = 'default', dir: string = '') {
    let modules = ['default', 'device', 'group', 'program', 'project', 'team', 'user'];
    if (!src) {
      //src = `<%= NO_IMAGE %>/${size}?text=${text}`;
      if (modules.indexOf(mod) !== -1) {
        src = `assets/img/avatar/${mod}.png`;
      } else {
        src = `assets/img/avatar/default.png`;
      }
    } else {
      if (dir) {
        dir = dir.replace('webroot/', '');
        src = `${apiBaseUrl}/${dir}${src}`;
      } else {
        src = `${apiBaseUrl}/${src}`;
      }
    }
    return src;
  }
}
