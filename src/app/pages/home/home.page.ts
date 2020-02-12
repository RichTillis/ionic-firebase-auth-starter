import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth/auth.service";
import { ToastService } from "../../services/toast/toast.service";
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { UserProfileModalPage } from '../user-profile-modal/user-profile-modal.page';
import { UserProfilePopoverComponent } from '../../components/user-profile-popover/user-profile-popover.component';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private modalController: ModalController,
    public popoverController: PopoverController
  ) { }

  ngOnInit() { }

  logout() {

    this.authService
      .logoutUser()
      .then(() => {
        this.logoutSucess();
        this.router.navigateByUrl("/login");
      })
      .catch(error => console.log(error));
  }
  logoutSucess() {

    this.toastService.present({
      message: "Logout successful. See ya next time!",
      duration: 3000,
      color: "secondary"
    });
  }

  navigateToProfile() {
    this.router.navigateByUrl("/user-profile");
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: UserProfileModalPage
    });

    modal.onDidDismiss().then((dataReturned) => {
      console.log('dismissed');
    });

    return await modal.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: UserProfilePopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }


}
