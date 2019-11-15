import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email address is required.' },
      { type: 'email', message: 'The format of the email address invalid.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' }
    ],
  }

  constructor(public formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['',  Validators.required]
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

  loginWithEmail(){
    console.log('login clicked');
  }

}
