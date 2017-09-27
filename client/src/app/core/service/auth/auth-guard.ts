import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  checkUrl(url: string) {
    let mod: string;
    let action: string;
    if (url) {
      const urls = url.split('/');
      if (urls[1] === 'users') {
        if (urls[2]) {
          mod = `${urls[1]}_${urls[2]}`;
          if (urls[4]) {
            action = 'u';
          } else if (urls[3]) {
            action = urls[3] === 'new' ? 'c' : 'r';
          } else {
            action = 'view';
          }
        }
      } else {
        if (urls[1]) {
          mod = urls[1];
          if (urls[3]) {
            action = 'u';
          } else if (urls[2]) {
            action = urls[2] === 'new' ? 'c' : 'r';
          } else {
            action = 'view';
          }
        }
      }
    }
    if (mod && action) {
      let canAccess = this.auth.checkPermission(mod, action);
      if (!canAccess) {
        this.router.navigate(['/']);
      }
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url.indexOf('auth') !== -1) {
      if (this.auth.isAuthenticated()) {
        this.auth.redirectToPrevStep();
        return false;
      } else {
        return true;
      }
    } else {
      if (this.auth.isAuthenticated()) {
        this.checkUrl(state.url);
        return true;
      } else {
        this.auth.redirectToLogin(state.url);
        return false;
      }
    }
  }

}
