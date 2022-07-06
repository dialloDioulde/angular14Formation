import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {AuthService} from "../../shared/auth.service";
import {PostService} from "../../shared/post.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FileUploadService} from "../../shared/file-upload.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  postForm !: FormGroup;
  postTypeList = ["Apartment", "Studio", "House", "Parking"];
  user = <any>User;
  actionButton: String = "SAVE";
  imageFile!: File;
  preview!: string;
  percentDone: any = 0;

  constructor(public authService: AuthService,
              public postService: PostService,
              public fb: FormBuilder, public router: Router,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<DialogComponent>,
              private fileUploadService: FileUploadService
  ) {
    // @ts-ignore
    this.authService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required,]],
      type: ['Apartment', [Validators.required,]],
      status: ['false',],
      description: ['', [Validators.required,]],
      user_id: [this.user._id,],
      image: [null],
    });

    // Edit
    if (this.editData) {
      this.actionButton = "UPDATE";
      this.postForm.controls["title"].setValue(this.editData.title);
      this.postForm.controls["type"].setValue(this.editData.type);
      this.postForm.controls["status"].setValue(this.editData.status);
      this.postForm.controls["description"].setValue(this.editData.description);
      //this.postForm.controls["image"].setValue("");
    }

  }

  //
  addPost() {
    if (!this.editData)
      this.createPost();
    else
      this.updatePost();
  }

  //
  createPost() {
    this.postService.create(this.postForm.value)
      .subscribe(
        res => {
          console.log(res);
          this.uploadPostFile(res, this.imageFile);
          this.getAllImageOfPosts();
          this.postForm.reset();
          this.dialogRef.close("create");
        },
        error => {
          console.log(error);
        });
  }

  //
  updatePost() {
    this.postService.update(this.editData._id, this.postForm.value)
      .subscribe(
        res => {
          this.dialogRef.close("update");
        },
        error => {
          console.log(error);
        });
  }

  //
  getFileSelected(event: any) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.imageFile = file;
    }

    // File Preview
    /*const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file);*/
  }

  //
  getAllImageOfPosts(): void {
    this.fileUploadService.getAllImageOfPosts()
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  //
  uploadPostFile(postData: any, imageFile: File) {
    this.fileUploadService.uploadPostImage(postData.title, imageFile, postData._id)
      .subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          // @ts-ignore
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          //this.router.navigate(['users-list']);
      }
    })
  }
  //



}
