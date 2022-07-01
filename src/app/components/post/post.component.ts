import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {DialogComponent} from "../dialog/dialog.component";
import {PostService} from "../../shared/post.service";

//
export interface tableElement {
  title: string;
  type: number;
  status: number;
  description: string;
  user_id: string;
}
//

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  displayedColumns: string[] = ['title', 'type', 'status', 'description', 'user_id', 'action'];
  ELEMENT_DATA: tableElement[] = [];
  dataSource = this.ELEMENT_DATA;

  constructor(private http: HttpClient, public authService: AuthService,
              public postService: PostService, public router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "create")
        this.getAllPosts();
    });
  }

  //
  getAllPosts(): void {
    this.postService.getAll()
      .subscribe(
        data => {
          this.ELEMENT_DATA = data;
          this.dataSource = data;
        },
        error => {
          console.log(error);
        });
  }

  //
  editPost(element: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: element,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "update")
        this.getAllPosts();
    });
  }

  //
  deletePost(id: Number) {
    this.postService.delete(id)
      .subscribe(
        data => {
          this.getAllPosts();
        },
        error => {
          console.log(error);
        });
  }

}
