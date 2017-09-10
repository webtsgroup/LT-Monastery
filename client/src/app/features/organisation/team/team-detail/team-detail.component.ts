import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  
  detail: any;
  isInit: any;

  constructor() {
    this.detail = {};
    this.isInit = true;
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.detail = {
      id: 21,
      avatar_url: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      manager: {
        id: 12,
        text: 'Dat Nguyen M.'
      },
      name: 'QC Team',
      officers: [
        {
          id: 1,
          text: 'Phuc Le T. T.',
          role: 
              {
                code: 'tma',
                name: 'Team manager assistant'
              }
        },
        {
          id: 2,
          text: 'Hai Le T.',
          role: 
              {
                code: 'tma',
                name: 'Team manager assistant'
              }
        }
      ],
      url: '',
      users : [
        {
          id: 11,
          position: 'ABA',
          text: 'Dat Nguyen M.',
          code: 'AT001',
          joined_date: '03/07/2018',
          employee_type: 'Employee',
          mail: 'dat.nguyen@asiantech.vn',
          total_percent: 100,
          probation: true,
          avatr_url: ''
        },
        {
          id: 12,
          position: 'ASE',
          text: 'Tien Le T. C.',
          code: 'AT002',
          joined_date: '03/07/2018',
          employee_type: 'Employee',
          mail: 'tien.le@asiantech.vn',
          total_percent: 100,
          probation: true,
          avatr_url: ''
        },
        {
          id: 13,
          position: 'ASE',
          text: 'Diep Le C. T.',
          code: 'AT003',
          joined_date: '03/07/2018',
          employee_type: 'ASE',
          mail: 'diep.le@asiantech.vn',
          total_percent: 50,
          probation: false,
          avatr_url: ''
        },
        {
          id: 14,
          position: 'ABA',
          text: 'Thach Nguyen P.',
          code: 'AT001',
          joined_date: '03/07/2018',
          employee_type: 'Employee',
          mail: 'thach.nguyen@asiantech.vn',
          total_percent: 100,
          probation: true,
          avatr_url: ''
        },
        {
          id: 15,
          position: 'ASE',
          text: 'Hue Thai T.',
          code: 'AT002',
          joined_date: '03/07/2018',
          employee_type: 'Employee',
          mail: 'hue.thai@asiantech.vn',
          total_percent: 100,
          probation: true,
          avatr_url: ''
        },
        {
          id: 16,
          position: 'ASE',
          text: 'Hai Le T.',
          code: 'AT003',
          joined_date: '03/07/2018',
          employee_type: 'ASE',
          mail: 'hai.le@asiantech.vn',
          total_percent: 50,
          probation: false,
          avatr_url: ''
        }
      ]
    };
    this.isInit = false;
  }

}
