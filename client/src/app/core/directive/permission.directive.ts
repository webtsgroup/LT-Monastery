import { Directive, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';

@Directive({
  selector: '[permission]'
})
export class PermissionDirective implements OnInit {

  @Input() permission: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this._checkPermission();
  }

  private _checkPermission() {
    const feature = this.permission[0];
    const action = this.permission[1];
    let canAccess = this.auth.checkPermission(feature, action);
    if (!canAccess) {
      if (this.permission[1] === 'r') {
        let firstChild = this.el.nativeElement.firstElementChild;
        if (firstChild === null) {
          firstChild = this.el.nativeElement.firstChild;
        }
        this.el.nativeElement.parentNode.insertBefore(firstChild, this.el.nativeElement);
        this.el.nativeElement.remove();
      } else if (this.permission[1] === 'view' && this.permission[2]) {
        let firstChild = this.el.nativeElement.firstElementChild;
        if (firstChild === null) {
          firstChild = this.el.nativeElement.firstChild;
        }
        this.el.nativeElement.parentNode.insertBefore(firstChild, this.el.nativeElement);
        this.el.nativeElement.remove();
      } else if (this.el.nativeElement.tagName === 'BUTTON') {
        this.el.nativeElement.disabled = true;
        //
      } else {
        this.el.nativeElement.remove();
      }
    }
  }

}
