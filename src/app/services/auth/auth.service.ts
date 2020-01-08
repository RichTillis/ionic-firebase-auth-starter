import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
// import "@firebase/auth";

import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: any;
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public afAuth: AngularFireAuth, private zone: NgZone) {}

  init(){
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });

    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
      });
    });
  }

  get isAuthenticated(): boolean {
    return (this.authState !== null) ? true : false;
  }

  async loginWithEmail(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async registerWithEmail(email: string, password: string) {
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async logoutUser() {
    await this.afAuth.auth.signOut();
  }

  async resetPassword(email: string) {
    await this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
