import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'urlSecure'})

export class UrlSecurePipe implements PipeTransform  {

  constructor(private sanitized: DomSanitizer){}

  transform(src: any) {
    const url = src.changingThisBreaksApplicationSecurity || src;
    return this.sanitized.bypassSecurityTrustResourceUrl(url);
  }
}
