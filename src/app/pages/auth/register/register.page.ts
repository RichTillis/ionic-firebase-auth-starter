import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from '../../../services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registrationForm: FormGroup;

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

  constructor(public formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  registerUser() {
    this.authService.registerWithEmail(this.registrationForm.get('email').value, this.registrationForm.get('password').value);
  }

  routeToLoginPage() {
    this.router.navigateByUrl('/login');
  }

  routeToForgotPasswordPage() {
    this.router.navigateByUrl('/forgot-password');
  }

}
