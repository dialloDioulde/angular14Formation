import { Component } from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

// @ts-ignore
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";
import {User} from "./models/user";
import {Role} from "./models/role";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularFormation';

  user = <any> User;
  constructor(private http: HttpClient, public authService: AuthService, public router: Router) {
    // @ts-ignore
    this.authService.user.subscribe(x => this.user = x);
  }

  goToMyProfile(){
    this.router.navigate(['user-profile/' + this.user._id]);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }
  get isUser() {
    return this.user && this.user.role === Role.User;
  }

  logoutUser() {
    this.authService.logoutUser();
  }


}
