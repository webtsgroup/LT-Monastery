import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth/auth.service';
import { ApiService } from '../../core/service/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  canAction: boolean;
  hasError: boolean;
  authenticator$: any;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {
    this.canAction = true;
  }

  ngOnInit() {}

  onSubmit(formData: any) {
    this.canAction = false;
    this.hasError = false;
    this.api.post(['administrators', 'login'], formData.value).subscribe(
      (data: any) => {
        this.auth.login(data.result);
      }, (err: any) => {
        this.hasError = true;
        this.canAction = true;
      }, () => {
        this.hasError = true;
        this.canAction = true;
      }
    );
  }

}
