import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public forgotPasswordForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email address is required.' },
      { type: 'email', message: 'The format of the email address invalid.' },
    ]
  }


  constructor(public formBuilder: FormBuilder, private router: Router) {
    this.forgotPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],

    });
  }

  ngOnInit() {

  }

  routeToRegisterPage() {
    this.router.navigateByUrl('/register');
  }

  routeToLoginPage() {
    this.router.navigateByUrl('/login');
  }

  resetPassword() {
    console.log('reset password button clicked');
  }

}
