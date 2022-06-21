import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {User} from "../../models/user";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser: any = {};

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
    });
  }



  ngOnInit(): void {
  }



}
