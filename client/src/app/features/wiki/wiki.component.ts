import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/service/api/api.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html'
})
export class WikiComponent implements OnInit {

  text: string;
  isInitialing: boolean;

  constructor(private api: ApiService) {
    this.text = 'Wiki';
    this.isInitialing = true;
    this.api.get(['administrators', 'index']).subscribe(
      (data: any) => {
        //
      },(err: any) => {
        //
      }, () => {
        //
      }
    );
  }

  ngOnInit() {
    setTimeout(() => {
      this.isInitialing = false;
    }, 2000);
  }

}
