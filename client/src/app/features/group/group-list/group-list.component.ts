import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/service/api/api.service';

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
    private api: ApiService
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
    this.api.get(['groups', 'delete', id]).subscribe(
      (data: any) => {
        //this.result = data.result || [];
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

}
