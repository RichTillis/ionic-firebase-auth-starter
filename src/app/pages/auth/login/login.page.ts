import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

import { AuthService } from "../../../services/auth/auth.service";
import { ToastService } from "../../../services/toast/toast.service";
import { LoadingService } from "../../../services/loading/loading.service";
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loggedIn: boolean;

  validation_messages = {
    email: [
      { type: "required", message: "Email address is required." },
      { type: "email", message: "The format of the email address invalid." }
    ],
    password: [{ type: "required", message: "Password is required." }]
  };

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private alertService: AlertService
  ) {
    this.loginForm = formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required]
    });
  }

  ngOnInit() { }

  routeToRegisterPage() {
    this.resetLoginForm();
    this.router.navigateByUrl("/register");
  }

  routeToForgotPasswordPage() {
    this.resetLoginForm();
    this.router.navigateByUrl("/forgot-password");
  }

  loginWithEmail() {
    let email: string = this.loginForm.get("email").value;
    let password: string = this.loginForm.get("password").value;

    this.loginPocessing();

    this.authService
      .loginWithEmail(email, password)
      .then(() => {
        this.resetLoginForm();
        this.loginSuccess();
        this.router.navigateByUrl("/home");
      })
      .catch(error => {
        console.log(error);
        this.loginFailed(error);
      });
  }

  loginPocessing() {
    this.loadingService.present({
      message: "Logging in . . ."
    });
  }

  loginSuccess() {
    this.loadingService.dismiss();

    this.toastService.present({
      message: "Welcome back!",
      duration: 3000,
      color: "secondary"
    });
  }

  loginFailed(error: any) {
    this.loadingService.dismiss();

    this.alertService.present({
      header: 'Login Error',
      subHeader: error.code,
      message: error.message,
      buttons: ['OK']
    });
  }

  resetLoginForm() {
    this.loginForm.get("email").setValue("");
    this.loginForm.get("password").setValue("");
    this.loginForm.reset(this.loginForm.value);
    this.loginForm.markAsPristine();
  }
}
