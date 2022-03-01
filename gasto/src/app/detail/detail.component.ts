import { Component } from '@angular/core';
import { CurrentUser } from '../entity/currentUser';
import { i18n } from '../i18n/i18n';
import { Utility } from '../service/utility';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  public i18n: i18n;
  private currentUser: CurrentUser;

  constructor() {
    this.i18n = new i18n();
    this.currentUser = new CurrentUser();
    const sessionUser = Utility.getSessionUser();
    if (sessionUser) {
      const user = JSON.parse(sessionUser);
      this.currentUser = Utility.updateCurrentUser(this.currentUser, user);
    }
  }

  public getDislpayEmailVerifiedAsIcon() {
    let result = '<i class="envelope open icon"></i>';
    if (this.currentUser.getEmailVerified()) {
        result += this.i18n.getText("28");
    } else {
        result += this.i18n.getText("29");
    }
    return result;
  }

  public getCurrentUser() {
    return this.currentUser;
  }
}
