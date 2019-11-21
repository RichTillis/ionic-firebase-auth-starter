import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl
} from "@angular/forms";

import { AuthService } from "../../../services/auth/auth.service";
import { ToastService } from "../../../services/toast/toast.service";
import { LoadingService } from "../../../services/loading/loading.service";

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
    public loadingService: LoadingService,
    private toastService: ToastService
  ) {
    this.loginForm = formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  routeToRegisterPage() {
    this.router.navigateByUrl("/register");
  }

  routeToForgotPasswordPage() {
    this.router.navigateByUrl("/forgot-password");
  }

  loginWithEmail() {
    let email: string = this.loginForm.get("email").value;
    let password: string = this.loginForm.get("password").value;

    this.loginPocessing();
    
    this.authService
      .loginWithEmail(email, password)
      .then(() => {
        this.resetLoginFormValues();
        this.loginSuccess();
        this.router.navigateByUrl("/home");
      })
      .catch(error => console.log(error));
  }

  loginPocessing(){
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

  resetLoginFormValues(){
    this.loginForm.get("email").setValue("");
    this.loginForm.get("password").setValue("");
  }
}
