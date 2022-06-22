import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = <any>  {};

  private userSubject!: BehaviorSubject<User>;
  public user: Observable<User> | undefined;

  constructor(private http: HttpClient, public router: Router) {
    // @ts-ignore
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  // User register
  registerUser(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // User login
  loginUser(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/login-user`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);

        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser._id = res.msg._id;
          this.currentUser.email = res.msg.email;
          this.currentUser.role = res.msg.role;
          localStorage.setItem('user', JSON.stringify(this.currentUser));
          this.userSubject.next(this.currentUser);
          this.router.navigate(['user-profile/' + res.msg._id]);
        });
      });
  }

  getCurrentUserData(): User {
    return this.userSubject.value;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  logoutUser() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    // @ts-ignore
    this.userSubject.next(null);
    //
    localStorage.removeItem('access_token');
    if (this.getToken() === null) {
      this.router.navigate(['login']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
