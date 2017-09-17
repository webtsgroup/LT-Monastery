import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

const apiBaseUrl = `${environment.apiBaseUrl}`;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  detail: any;
  isInit: any;
  itemId: number;
  userType: string;

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
      this.userType = params.slug;
    });
  }

  fetchData() {
    this.api.get(['/users', 'view', this.itemId]).subscribe(
      (data: any) => {
        this.detail = data.result.user || {};
        this.detail.galleries = [];
        if (this.detail.images) {
          for (let img of this.detail.images) {
            let src = `${apiBaseUrl}/${img.dir.replace('webroot/', '')}${img.file}`;
            this.detail.galleries.push({source: src});
          }
        }
      }, (err) => {
        //
      }, () => {
        this.isInit = false;
      }
    );
  }

}
