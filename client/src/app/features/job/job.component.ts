import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/service/api/api.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html'
})
export class JobComponent implements OnInit {

  text: string;
  isInitialing: boolean;
  result: any;
  itemDetail: any;
  displayDialog: boolean;
  type: any;
  isProcessing: boolean;

  constructor(
    private api: ApiService,
    private confirm: ConfirmationService
  ) {
    this.isInitialing = true;
    this.displayDialog = false;
    this.isProcessing = false;
    this.type = [
      {
        code: 'internal',
        value: 1
      }, 
      {
        code: 'external',
        value: 0
      }
    ];
    this.itemDetail = {};
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.get(['jobs', 'index']).subscribe(
      (data: any) => {
        this.result = data.result || [];
        this.result.map((item: any) => {
          if (item.is_internal === 1) {
            item.type = 'internal';
          } else if (item.is_internal === 0) {
            item.type = 'external';
          } else {
            item.type = 'not_set';
          }
          return item
        });
      },(err: any) => {
        this.isInitialing = false;
      }, () => {
        this.isInitialing = false;
      }
    );
  }

  showDialog(item: any = {}) {
    this.displayDialog = true;
    this.itemDetail = item;
  }

  onSubmit() {
    this.isProcessing = true;
    let func: any;
    let summary: string;
    const data: any = this.itemDetail;
    if (this.itemDetail.id) {
      summary = 'Updated';
      func = this.api.post(['jobs', 'update', this.itemDetail.id], data);
    } else {
      summary = 'Added';
      func = this.api.post(['jobs', 'create'], data);
    }
    func.subscribe(
      (data: any) => {
        this.fetchData();
      }, () => {
        this.displayDialog = false;
        this.isProcessing = false;
      }, () => {
        this.displayDialog = false;
        this.isProcessing = false;
      }
    );
  }

  delete(id: number) {
    this.confirm.confirm({
      message: 'Bạn muốn xoá nghề nghiệp này?',
      accept: () => {
        this.isProcessing = false;
        this.api.get(['jobs', 'delete', id]).subscribe(
          (data: any) => {
            this.result = data.result || [];
            this.result.map((item: any) => {
              if (item.is_internal === 1) {
                item.type = 'internal';
              } else if (item.is_internal === 0) {
                item.type = 'external';
              } else {
                item.type = 'not_set';
              }
              return item
            });
          }, (err) => {
            this.displayDialog = false;
            this.isProcessing = false;
          }, () => {
            this.displayDialog = false;
            this.isProcessing = false;
          }
        );
      }
    });

  }

}
