import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {AuthService} from "../../shared/auth.service";
import {PostService} from "../../shared/post.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  postForm !: FormGroup;
  postTypeList = ["Apartment", "Studio", "House", "Parking"];
  user = <any>User;

  constructor(public authService: AuthService, public postService: PostService,
              public fb: FormBuilder, public router: Router, private dialogRef: MatDialogRef<DialogComponent>) {
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
  }

  addPost() {
    this.postService.create(this.postForm.value)
      .subscribe(
        res => {
          this.postForm.reset();
          this.closeDialog();
        },
        error => {
          console.log(error);
        });
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
