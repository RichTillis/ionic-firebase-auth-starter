import { Injectable, NgZone } from "@angular/core";
import { Platform } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public afAuth: AngularFireAuth, private platform: Platform, private zone: NgZone) { }

  ngOnInit(){
    // Emit logged in status whenever auth state changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
      });
    });
  }

  login(): void {
    // if (this.platform.is("capacitor")) {
    //   this.nativeFacebookAuth();
    // } else {
      // this.browserFacebookAuth();
    // }
  }
}
