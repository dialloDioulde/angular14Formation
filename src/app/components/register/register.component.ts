import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomValidators} from "../../utils/custom-validators";


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
      password: ['',
        [
          Validators.required,
          // 2. check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {hasSpecialCharacters: true}),
          // 6. Has a minimum length of 8 characters
          Validators.minLength(8)

      ]],
      passwordConfirmation: ['', [Validators.required,]], },
        {
          validator: CustomValidators.mustMatch('password', 'passwordConfirmation')
        })
  }

  registerUser() {}

}
