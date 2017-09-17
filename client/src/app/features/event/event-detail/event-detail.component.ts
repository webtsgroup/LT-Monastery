import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit {

  detail: any;
  isInit: any;
  itemId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    this.detail = {};
    this.isInit = true;
  }

  ngOnInit() {
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

}
