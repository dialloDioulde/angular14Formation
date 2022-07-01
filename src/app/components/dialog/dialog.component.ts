import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {AuthService} from "../../shared/auth.service";
import {PostService} from "../../shared/post.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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

  constructor(public authService: AuthService,
              public postService: PostService,
              public fb: FormBuilder, public router: Router,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<DialogComponent>) {
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
    });

    // Edit
    if (this.editData) {
      this.actionButton = "UPDATE";
      this.postForm.controls["title"].setValue(this.editData.title);
      this.postForm.controls["type"].setValue(this.editData.type);
      this.postForm.controls["status"].setValue(this.editData.status);
      this.postForm.controls["description"].setValue(this.editData.description);
    }

  }

  addPost() {
    if (!this.editData)
      this.createPost();
    else
      this.updatePost();
  }

  createPost() {
    this.postService.create(this.postForm.value)
      .subscribe(
        res => {
          this.postForm.reset();
          this.dialogRef.close("create");
        },
        error => {
          console.log(error);
        });
  }

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



}
