import { Component } from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

// @ts-ignore
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularFormation';

  constructor(private http: HttpClient, public authService: AuthService, public router: Router) { }

  goToMyProfile(){
    // @ts-ignore
    let authToken = localStorage.getItem('access_token');
    // @ts-ignore
    let decoded = jwt_decode(authToken);
    // @ts-ignore
    this.router.navigate(['user-profile/' + decoded.userId]);
  }

  logoutUser() {
    this.authService.logoutUser();
  }


}
