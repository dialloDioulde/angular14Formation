import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm !: FormGroup;
  constructor(
    public fb: FormBuilder,
    //public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      passwordConfirmation: ['', [Validators.required,],
        {
          //validator: ConfirmedValidator('password', 'passwordConfirmation')
          //validator: ConfirmedValidator('password', 'passwordConfirmation')
        }]
    });
  }

  registerUser() {}

}
