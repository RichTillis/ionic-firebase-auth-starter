import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-profile-popover',
  templateUrl: './user-profile-popover.component.html',
  styleUrls: ['./user-profile-popover.component.scss'],
})
export class UserProfilePopoverComponent implements OnInit {
  userProfile: User = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      console.log('current user: ', user);
      this.userProfile = user;
    });
  }

}
