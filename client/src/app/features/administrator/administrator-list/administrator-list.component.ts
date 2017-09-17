import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/api/api.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.scss']
})
export class AdministratorListComponent implements OnInit {

  isInit: boolean;
  // user list
  result: any;
  selectedItems: Array<any>;

  constructor(
    private api: ApiService,
    private confirm: ConfirmationService
  ) {
    this.isInit = true;
    this.result = [];
    this.selectedItems = [];
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.get(['administrators', 'index']).subscribe(
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
        message: 'Bạn muốn xóa Sự kiện này?',
        accept: () => {
          this.api.get(['administrators', 'delete', id]).subscribe(
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
