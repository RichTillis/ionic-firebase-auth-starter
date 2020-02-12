import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../../services/auth/auth.service";
import { LoadingService } from "../../../services/loading/loading.service";
import { ToastService } from "../../../services/toast/toast.service";
import { AlertService } from "../../../services/alert/alert.service";

import { confirmPasswordValidator } from '../../../validators/confirm-password-validator';

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  registrationForm: FormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "Email address is required." },
      { type: "email", message: "The format of the email address invalid." }
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 8 characters long."
      }
    ],
    confirmPassword: [
      { type: "required", message: "Confirm Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 8 characters long."
      }
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      //not yet finished
      confirmPassword: ["", Validators.compose([Validators.required, confirmPasswordValidator])]
    });
  }

  registerUser() {
    const email: string = this.registrationForm.controls['email'].value;
    const password: string = this.registrationForm.controls['password'].value;

    this.registrationProcessing();

    this.authService
      .registerWithEmail(email, password)
      .then(() => {
        this.registrationSuccess();
        this.router.navigateByUrl("/home");
      })
      .catch(error => {
        console.log(error);
        this.registrationFailed(error);
      });
  }

  registrationProcessing() {
    this.loadingService.present({
      message: "Registering. . ."
    });
  }

  registrationSuccess() {
    this.loadingService.dismiss();

    this.toastService.present({
      message: "All registered, welcome aboard!",
      duration: 3000,
      color: "secondary"
    });
  }

  registrationFailed(error: any) {
    this.loadingService.dismiss();

    this.alertService.present({
      header: "Registration Error",
      subHeader: error.code,
      message: error.message,
      buttons: ["OK"]
    });
  }

  routeToLoginPage() {
    this.resetRegistrationForm();
    this.router.navigateByUrl("/login");
  }

  resetRegistrationForm() {
    this.registrationForm.controls['email'].reset();
    this.registrationForm.controls['password'].reset()
    this.registrationForm.reset(this.registrationForm.value);
    this.registrationForm.markAsPristine();
  }

}
