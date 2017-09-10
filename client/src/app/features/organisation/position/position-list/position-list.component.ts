import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/service/api/api.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html'
})
export class PositionListComponent implements OnInit {

  isInitializing: any;
  positions: Array<any>;
  selectedItems: Array<any>;

  constructor(private api: ApiService) {
    this.isInitializing = true;
    this.positions = [];
    this.selectedItems = [];
  }

  ngOnInit() {
    this.api.get(['positions']).subscribe(
      (data: any) => {
        this.positions = data.positions || [];
      },(err: any) => {
        //
      }, () => {
        this.isInitializing = false;
      }
    );
  }

  /* when select checkbox*/
  selected(event: any) {
    //
  }

  delete(id: number) {
    //
  }

}
