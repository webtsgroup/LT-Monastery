import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/api/api.service';
import { ConfirmationService } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html'
})
export class GroupDetailComponent implements OnInit {

  detail: any;
  isInit: any;
  itemId: number;
  selectedItems: any;
  users: any;
  hasUsers: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private confirm: ConfirmationService
  ) {
    this.detail = {};
    this.isInit = true;
    this.selectedItems = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.itemId = +params.id;
        this.fetchData();
      }
    });
  }

  fetchData() {
    this.api.get(['groups', 'view', this.itemId, 0]).subscribe(
      (data: any) => {
        this.detail = data.result.group || {};
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

  showBox() {
    this.fetchUsers();
  }

  addToGroup() {
    this.api.post(['groups', 'pushMembers', this.itemId], this.selectedItems).subscribe(
      (data: any) => {
        this.detail = data.result.group || {};
      }, (err) => {
        this.hasUsers = false;
      }, () => {
        this.isInit = false;
        this.hasUsers = false;
      }
    );
  }

  fetchUsers() {
    this.api.get(['groups', 'usersExcludeMembers', this.itemId]).subscribe(
      (data: any) => {
        this.users = data.result || [];
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
        this.hasUsers = true;
      }
    );
  }

  onFilter() {
    this.selectedItems = [];
  }

  delete(id: number) {
    this.confirm.confirm({
      message: 'Bạn muốn xóa người này?',
      accept: () => {
        this.api.get(['groups', 'deleteMembers', id, this.itemId]).subscribe(
          (data: any) => {
            this.detail = data.result.group || {};
          }, (err) => {
            //
          }, () => {
            this.isInit = false;
          }
        );
      }
    });
  }

}