import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  year: any;
  constructor() { }

  ngOnInit() {
    this.year = '2017';
  }

}
