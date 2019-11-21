import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from "../../../services/auth/auth.service";
import { ToastService } from "../../../services/toast/toast.service";
import { LoadingService } from "../../../services/loading/loading.service";
import { AlertService } from '../../../services/alert/alert.service';

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


  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private alertService: AlertService) {
    this.forgotPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],

    });
  }

  ngOnInit() {

  }

  resetPassword(): void {
    let email: string = this.forgotPasswordForm.get("email").value;

    this.resetPasswordPocessing();

    this.authService.resetPassword(email)
      .then(() => {
        this.resetForm();
        this.resetRequestSuccess();
        this.router.navigateByUrl("/login");
      }).catch(error => {
        this.requestFailed(error)
      });
  }

  resetPasswordPocessing() {
    this.loadingService.present({
      message: "Submitting request . . ."
    });
  }

  resetForm() {
    this.forgotPasswordForm.get("email").setValue("");
    this.forgotPasswordForm.reset(this.forgotPasswordForm.value);
    this.forgotPasswordForm.markAsPristine();
  }

  resetRequestSuccess() {
    this.loadingService.dismiss();

    this.toastService.present({
      message: "An email is on the way with password reset instructions",
      showCloseButton: true,
      color: "secondary"
    });
  }

  requestFailed(error: any) {
    this.loadingService.dismiss();

    this.alertService.present({
      header: 'Login Error',
      subHeader: error.code,
      message: error.message,
      buttons: ['OK']
    });
  }

  routeToRegisterPage() {
    this.resetForm();
    this.router.navigateByUrl('/register');
  }

  routeToLoginPage() {
    this.resetForm();
    this.router.navigateByUrl('/login');
  }

}
