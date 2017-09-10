import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth/auth.service';

export interface JQuery {
  (element?: ElementRef): any;
  metisMenu(): JQuery;
}

declare var jQuery: JQuery;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  @ViewChild('sideMenu') sideMenu: ElementRef;
  userInfo: any;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.userInfo = this.auth.getUserInfo();
  }

  ngAfterViewInit() {
    // Active metisMenu functions on sidebar
    jQuery(this.sideMenu.nativeElement).metisMenu();
  }

}
