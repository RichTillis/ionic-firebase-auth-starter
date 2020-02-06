import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import 'firebase/firestore';
import { switchMap } from "rxjs/operators";
import { User } from "../../interfaces/user";

import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  private authState: any;
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public afAuth: AngularFireAuth,
    private zone: NgZone,
    private afs: AngularFirestore) { }

  init() {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log("User already logged in: ", user);
          let userDoc = this.afs.doc<User>(`users/${user.uid}`);
          return userDoc.valueChanges();
        } else {
          console.log("No user logged in.");
          return of(null);
        }
      })
    );

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
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.createNewUserDocumentInFirebase(email, credential.user)
  }

  async logoutUser() {
    await this.afAuth.auth.signOut();
  }

  async resetPassword(email: string) {
    await this.afAuth.auth.sendPasswordResetEmail(email);
  }

  createNewUserDocumentInFirebase( email: string, user: firebase.User ): void {
    const newUser: User = {
      uid: user.uid,
      email: email
    };
    console.log("currentUserId: ", user.uid);
    let userDoc: AngularFirestoreDocument<User> = this.afs.doc<User>(`users/${user.uid}`);
    userDoc.set(newUser);
  }

  updateUserDocumentInFirebase(user: User): void {
    let userDoc: AngularFirestoreDocument<User> = this.afs.doc<User>(`users/${user.uid}`);
    userDoc.update(user);
  }

}
