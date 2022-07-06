import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {PostImage} from "../models/postImage";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  endpoint = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  // Get all images of posts
  getAllImageOfPosts(): Observable<any> {
    let api = `${this.endpoint}/all-image-post`;
    return this.http.get(api);
  }

  // Upload Post Images
  uploadPostImage(name: string, postImage: File, postId: string): Observable<any> {
    let formData: any = new FormData();
    formData.append('name', name);
    formData.append('avatar', postImage);
    formData.append('post_id', postId);
    return this.http.post<PostImage>(`${this.endpoint}/upload-post-image`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
