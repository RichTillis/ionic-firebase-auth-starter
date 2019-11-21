import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loggedIn: boolean;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email address is required.' },
      { type: 'email', message: 'The format of the email address invalid.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' }
    ],
  }

  constructor(public formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  routeToRegisterPage() {
    this.router.navigateByUrl('/register');
  }

  routeToForgotPasswordPage() {
    this.router.navigateByUrl('/forgot-password');
  }

  loginWithEmail() {
    let email: string = this.loginForm.get('email').value;
    let password: string = this.loginForm.get('password').value;

    this.authService.loginWithEmail(email, password)
      .then(() => {
        this.loginSuccess()
        this.router.navigateByUrl('/home');
      })
      .catch(error => console.log(error));

  }

  loginSuccess() {
    console.log("login successful");
    // this.utilService.displayOkAlert("Welcome", null, "Registration Successful");
  }


}
