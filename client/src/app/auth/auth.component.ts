import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/service/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent {

  year: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.year = '2017';
  }

}
