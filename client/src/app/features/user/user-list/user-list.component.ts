import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
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
  columnOptions: any;
  cols: any[];
  metadata: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private confirm: ConfirmationService
  ) {
    this.isInit = true;
    this.result = [];
    this.selectedItems = [];
    this.metadata = {};
  }

  ngOnInit() {
    this.cols = [
      { field: 'barcode', header: 'Barcode' },
      { field: 'phone', header: 'SDT' },
      { field: 'email', header: 'Email' },
      { field: 'facebook', header: 'Facebook' },
      { field: 'province', header: 'Tỉnh/TP' },
      { field: 'district', header: 'Quận/Huyện' },
      { field: 'address', header: 'Địa chỉ' },
      { field: 'birthday', header: 'Ngày sinh' },
      { field: 'job', header: 'Nghề nghiệp' }
    ];

    this.columnOptions = [];
    for(let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
    }
    const hiddenField = ['facebook', 'province', 'district', 'address'];
    this.cols = this.cols.filter((obj: any) => {
      return !hiddenField.includes(obj.field);
    });
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
        this.result = data.result.users || [];
        this.metadata.provinces = data.result.provinces || [];

        this.metadata.jobs = data.result.jobs || [];

        this.metadata.districts = data.result.districts || [];

      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

  delete(id: number) {
    this.confirm.confirm({
      message: 'Bạn muốn xóa người này?',
      accept: () => {
        this.api.get(['users', 'delete', id, this.userType]).subscribe(
          (data: any) => {
            this.result = data.result || [];
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
