import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    let api = `${this.endpoint}/all-post`;
    return this.http.get(api);
  }

  get(id: Number): Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  create(data: any): Observable<any> {
    let api = `${this.endpoint}/create-post`;
    return this.http.post(api, data);
  }


  update(id: Number, data: any): Observable<any> {
    return this.http.put(`${this.endpoint}/update-post/${id}`, data);
  }

  delete(id: Number): Observable<any> {
    return this.http.delete(`${this.endpoint}/delete-post/${id}`);
  }

  /*
  deleteAll(): Observable<any> {
    return this.http.delete(this.endpoint);
  }

  findByTitle(title: any): Observable<any> {
    return this.http.get(`${this.endpoint}?title=${title}`);
  }*/

}
