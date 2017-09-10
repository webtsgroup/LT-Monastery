import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html'
})
export class TeamListComponent implements OnInit {

  isInit: boolean;
  // team list
  result: any;
  selectedItems: Array<any>;

  constructor() {
    this.isInit = true;
    this.result = [];
    this.selectedItems = [];
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.result = [
      {
        id: 1,
        name: 'Front End',
        avatar_url: '',
        manager: {
          id: 1,
          text: 'Huy Dinh Q.'
        }
      },
      {
        id: 2,
        name: 'Ruby',
        avatar_url: '',
        manager: {
          id: 1,
          text: 'Huy Dinh Q.'
        }
      },
      {
        id: 3,
        name: 'PHP',
        avatar_url: '',
        manager: {
          id: 2,
          text: 'Toan Nguyen T.'
        }
      },
      {
        id: 4,
        name: 'Android',
        avatar_url: '',
        manager: {
          id: 3,
          text: 'Tien Nguyen P.'
        }
      },
      {
        id: 1,
        name: 'Front End',
        avatar_url: '',
        manager: {
          id: 1,
          text: 'Huy Dinh Q.'
        }
      },
      {
        id: 2,
        name: 'Ruby',
        avatar_url: '',
        manager: {
          id: 1,
          text: 'Huy Dinh Q.'
        }
      },
      {
        id: 3,
        name: 'PHP',
        avatar_url: '',
        manager: {
          id: 2,
          text: 'Toan Nguyen T.'
        }
      },
      {
        id: 4,
        name: 'Android',
        avatar_url: '',
        manager: {
          id: 3,
          text: 'Tien Nguyen P.'
        }
      },
      {
        id: 1,
        name: 'Front End',
        avatar_url: '',
        manager: {
          id: 1,
          text: 'Huy Dinh Q.'
        }
      },
      {
        id: 2,
        name: 'Ruby',
        avatar_url: '',
        manager: {
          id: 1,
          text: 'Huy Dinh Q.'
        }
      },
      {
        id: 3,
        name: 'PHP',
        avatar_url: '',
        manager: {
          id: 2,
          text: 'Toan Nguyen T.'
        }
      },
      {
        id: 4,
        name: 'Android',
        avatar_url: '',
        manager: {
          id: 3,
          text: 'Tien Nguyen P.'
        }
      },
      {
        id: 1,
        name: 'Front End',
        avatar_url: '',
        manager: {
          id: 1,
          text: 'Huy Dinh Q.'
        }
      },
      {
        id: 2,
        name: 'Ruby',
        avatar_url: '',
        manager: {
          id: 1,
          text: 'Huy Dinh Q.'
        }
      },
      {
        id: 3,
        name: 'PHP',
        avatar_url: '',
        manager: {
          id: 2,
          text: 'Toan Nguyen T.'
        }
      },
      {
        id: 4,
        name: 'Android',
        avatar_url: '',
        manager: {
          id: 3,
          text: 'Tien Nguyen P.'
        }
      }
    ];
    setTimeout(() => {
      this.isInit = false;
    }, 1000);
  }
}
