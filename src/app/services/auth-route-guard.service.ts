import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.authenticated$
      .pipe(
        take(1),
        map(authenticated => {
          if (authenticated === true) {
            return true;
          } else {
            return this.router.createUrlTree(['']);
          }
        })
      );
  }
}
