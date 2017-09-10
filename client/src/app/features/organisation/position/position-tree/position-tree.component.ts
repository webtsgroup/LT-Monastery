import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/service/api/api.service';

@Component({
  selector: 'app-position-tree',
  templateUrl: './position-tree.component.html'
})
export class PositionTreeComponent implements OnInit {

  isInitializing: any;

  constructor(private api: ApiService) {
    this.isInitializing = true;
  }

  ngOnInit() {
    this.api.get(['positions']).subscribe(
      (data: any) => {
        //
      },(err: any) => {
        //
      }, () => {
        this.isInitializing = false;
      }
    );
  }

}
