import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class HtmlPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {}

  transform(value: any, isBreakLine: boolean = false) {
    //apply breakline for textarea
    if (isBreakLine && value) {
      value = value.replace(/\r?\n/g, '<br />');
    }
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
