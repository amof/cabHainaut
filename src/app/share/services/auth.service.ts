import { Injectable } from '@angular/core';
import { User, UserLogin } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
  ) {
    /* Saving user data in local storage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.loggedIn.next(true);
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        this.loggedIn.next(false);
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  SignIn(user: UserLogin) {
    if (user.rememberMe === true)
    { // Indicates that the state will be persisted even when the browser window is closed or the activity is destroyed
      this.afAuth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL);
    } else
    { // Indicates that the state will only persist in the current session or tab,
      // and will be cleared when the tab or window in which the user authenticated is closed
      this.afAuth.setPersistence(firebase.default.auth.Auth.Persistence.SESSION);
    }
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log(result);
        this.SetUserData(result.user);
      }, error => {
        console.log(error.message);
      });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUserId(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? user.uid : false;
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

}
