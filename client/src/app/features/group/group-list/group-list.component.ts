import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/service/api/api.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  isInit: boolean;
  // user list
  result: any;
  selectedItems: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private confirm: ConfirmationService
  ) {
    this.isInit = true;
    this.result = [];
    this.selectedItems = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fetchData();
    });
  }

  fetchData() {
    this.api.get(['groups', 'index']).subscribe(
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
    this.confirm.confirm({
      message: 'Bạn muốn xóa Nhóm này?',
      accept: () => {
        this.api.get(['groups', 'delete', id]).subscribe(
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
