import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/service/api/api.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html'
})
export class JobComponent implements OnInit {

  text: string;
  isInitialing: boolean;
  result: any;

  constructor(private api: ApiService) {
    this.isInitialing = true;
  }

  ngOnInit() {
    this.api.get(['job', 'index']).subscribe(
      (data: any) => {
        this.result = data.result || {};
      },(err: any) => {
        this.isInitialing = false;
      }, () => {
        this.isInitialing = false;
      }
    );
  }

}
