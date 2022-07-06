import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {DialogComponent} from "../dialog/dialog.component";
import {PostService} from "../../shared/post.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

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
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log(error);
        });
  }

  //
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
