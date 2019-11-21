import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import "@firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any;

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  onAuthStateChanged() {
    this.afAuth.auth.onAuthStateChanged(user => {
      this.authState = user
    });
  }

  async loginWithEmail(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async registerWithEmail(email: string, password: string) {
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async logoutUser() {
    await this.afAuth.auth.signOut();
    console.log("user logged out");
  }
}
