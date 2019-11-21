import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../../services/auth/auth.service";
import { LoadingService } from "../../../services/loading/loading.service";
import { ToastService } from "../../../services/toast/toast.service";

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
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }

  async registerUser() {
    let email: string = this.registrationForm.get("email").value;
    let password: string = this.registrationForm.get("password").value;
    
    this.registrationProcessing();

    this.authService
      .registerWithEmail(email, password)
      .then(() => {
        this.registrationSuccess();
        this.router.navigateByUrl("/home");
      })
      .catch(error => console.log(error));
  }

  registrationProcessing(){
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

  routeToLoginPage() {
    this.resetRegistrationForm();
    this.router.navigateByUrl("/login");
  }

  routeToForgotPasswordPage() {
    this.resetRegistrationForm();
    this.router.navigateByUrl("/forgot-password");
  }

  resetRegistrationForm(){
    this.registrationForm.get("email").setValue("");
    this.registrationForm.get("password").setValue("");    
    this.registrationForm.reset(this.registrationForm.value);
    this.registrationForm.markAsPristine();
  }
}
