import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logoutUser()
      .then(() => {        
        this.router.navigateByUrl('/login');
      })
      .catch(error => console.log(error));
  }

}
