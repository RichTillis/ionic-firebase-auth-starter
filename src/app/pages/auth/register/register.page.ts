import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from '../../../services/auth/auth.service';
import { LoadingService } from '../../../services/loading/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registrationForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email address is required.' },
      { type: 'email', message: 'The format of the email address invalid.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' }
    ],
  }

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public loadingService: LoadingService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  async registerUser() {
    let email: string = this.registrationForm.get('email').value;
    let password: string = this.registrationForm.get('password').value;

    this.loadingService.present({
      message: 'Registering. . .'
    });

    this.authService.registerWithEmail(email, password)
      .then(() => {
        this.loadingService.dismiss();
        this.registerSuccess()
        this.router.navigateByUrl('/home');
      })
      .catch(error => console.log(error));
  }

  registerSuccess() {
    console.log("registration successful");
    // this.utilService.displayOkAlert("Welcome", null, "Registration Successful");
  }

  routeToLoginPage() {
    this.router.navigateByUrl('/login');
  }

  routeToForgotPasswordPage() {
    this.router.navigateByUrl('/forgot-password');
  }

}
