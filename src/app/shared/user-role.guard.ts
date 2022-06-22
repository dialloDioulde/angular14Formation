import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.authService.getCurrentUserData();
    if (user) {
      // user's roles contains route's role
      // @ts-ignore
      if (route.data['roles'] && route.data['roles'].includes(user.role)) {
        return true;
      } else {  // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
    }

    this.router.navigate(['login']);
    return false;
  }

}
