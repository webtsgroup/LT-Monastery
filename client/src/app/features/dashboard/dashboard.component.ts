import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/service/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  text: string;
  isInitialing: boolean;
  result: any;

  constructor(private api: ApiService) {
    this.isInitialing = true;
  }

  ngOnInit() {
    this.api.get(['dashboard', 'index']).subscribe(
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
