import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit {

  detail: any;
  isInit: any;
  itemId: number;
  selectedItems: any;
  users: any;
  hasUsers: boolean;
  cols: any;
  columnOptions: any;
  type: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private confirm: ConfirmationService
  ) {
    this.detail = {};
    this.isInit = true;
    this.selectedItems = [];
    this.type = 'all';
  }

  ngOnInit() {
    this.cols = [
      { field: 'barcode', header: 'Barcode' },
      //{ field: 'group', header: 'Nhóm' },
      //{ field: 'email', header: 'Email' },
      //{ field: 'facebook', header: 'Facebook' },
      { field: 'province', header: 'Tỉnh/TP' },
      { field: 'district', header: 'Quận/Huyện' },
      //{ field: 'address', header: 'Địa chỉ' },
      { field: 'birthday', header: 'Ngày sinh' },
      { field: 'job', header: 'Nghề nghiệp' }
    ];

    this.columnOptions = [];
    for(let i = 0; i < this.cols.length; i++) {
        this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
    }
    const hiddenField = ['facebook', 'province', 'address'];
    this.cols = this.cols.filter((obj: any) => {
      return !hiddenField.includes(obj.field);
    });
    this.route.params.subscribe(params => {
      if (params.id) {
        this.itemId = +params.id;
        this.fetchData();
      }
    });
  }

  fetchData() {
    this.api.get(['events', 'view', this.itemId, 0]).subscribe(
      (data: any) => {
        this.detail = data.result.event || {};
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

  closeBox() {
    this.selectedItems = [];
    this.hasUsers = false;
  }

  addToGroup() {
    this.api.post(['events', 'pushMembers', this.itemId], this.selectedItems).subscribe(
      (data: any) => {
        this.detail = data.result.event || {};
      }, (err) => {
        this.selectedItems = [];
        this.hasUsers = false;
      }, () => {
        this.selectedItems = [];
        this.isInit = false;
        this.hasUsers = false;
      }
    );
  }

  fetchUsers() {
    this.selectedItems = [];
    this.api.get(['events', 'usersExcludeMembers', this.itemId, this.type]).subscribe(
      (data: any) => {
        this.users = data.result || [];
      }, (err) => {
        this.users = [];
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
        this.api.get(['events', 'deleteMembers', id, this.itemId]).subscribe(
          (data: any) => {
            this.detail = data.result.event || {};
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
