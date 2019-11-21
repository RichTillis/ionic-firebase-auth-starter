import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth/auth.service";
import { ToastService } from "../../services/toast/toast.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  logout() {
    this.authService
      .logoutUser()
      .then(() => {
        this.logoutSucess();
        this.router.navigateByUrl("/login");
      })
      .catch(error => console.log(error));
  }

  logoutSucess(){
    this.toastService.present({
      message: "Logout successful. See ya next time!",
      duration: 3000,
      color: "secondary"
    });
  }
}
