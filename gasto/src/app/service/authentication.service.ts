import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { CurrentUser } from './currentUser';
import { Utility } from './Utility';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private provider: GoogleAuthProvider;
  private currentUser: CurrentUser;

  constructor(private auth: Auth) {
    this.provider = new GoogleAuthProvider();
    this.currentUser = new CurrentUser();
  }

  public async loginOrSignUp(): Promise<any> {
    return await signInWithPopup(this.auth, this.provider);
  }

  public async signOut(): Promise<any> {
    return await signOut(this.auth);
  }

  public resetCurrentUser() {
    this.currentUser = new CurrentUser();
  }

  public getCurrentUser() {
    if (this.auth.currentUser) {
      this.createCurrentUser();
    }
    const sessionUser = Utility.getSessionUser();
    if (sessionUser) {
      const user = JSON.parse(sessionUser);
      this.currentUser = Utility.updateCurrentUser(this.currentUser, user);
    }
    return this.currentUser;
  }

  private createCurrentUser() {
    const user = this.auth.currentUser;
    const uid = this.currentUser.getUID();
    if (!uid) {
      this.currentUser = Utility.updateCurrentUser(this.currentUser, user);
      Utility.setSessionUser(this.currentUser);
    }
  }

}