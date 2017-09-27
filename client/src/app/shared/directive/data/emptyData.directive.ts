import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[emptyData]'
})

/**
 * Using this Directive to checking and re-renderring specific element
 * @param  {any} emptyData [data input]
 * New element will be rendered if Data input is empty
 */
export class EmptyDataDirective implements OnInit {

  @Input() emptyData: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) {
    //
  }

  ngOnInit() {
    /**
     * This script can be covering that case bellows:
     * @input {Array} data is empty
     * @input {Any} data is null, undefined, '', false, 0
     */
    if(!this.emptyData || (this.emptyData && !this.emptyData.length)) {
      //creating new element
      let insteadElm = this.renderer.createElement(this.el.nativeElement.parentNode, 'span');
      //setting class name is text-na
      this.renderer.setElementClass(insteadElm, 'text-na', true);
      //setting content for it
      this.renderer.createText(insteadElm, 'Chưa có thông tin');
      //append new above current element
      this.el.nativeElement.parentNode.insertBefore(insteadElm, this.el.nativeElement);
      //delete current element
      this.el.nativeElement.remove();
    }
  }

}
