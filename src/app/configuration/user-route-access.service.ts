import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import {LoginService} from "../shared/service/login/login.service";


@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    if(this.loginService.isLoggedOut()){
      this.router.navigate(['/login']);
    }

    return of(this.loginService.isLoggedIn());
  }
}
