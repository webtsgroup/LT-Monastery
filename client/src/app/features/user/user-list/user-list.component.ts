import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/service/api/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  isInit: boolean;
  userType: string;
  // user list
  result: any;
  selectedItems: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    this.isInit = true;
    this.result = [];
    this.selectedItems = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.slug) {
        this.userType = params.slug;
        this.fetchData();
      }
    });
  }

  fetchData() {
    this.api.get(['users', 'index', this.userType]).subscribe(
      (data: any) => {
        this.result = data.result || [];
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

  delete(id: number) {
    this.api.get(['users', 'delete', id]).subscribe(
      (data: any) => {
        //this.result = data.result || [];
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }
}
