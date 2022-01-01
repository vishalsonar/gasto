import { Component } from '@angular/core';
import { CurrentUser } from '../entity/currentUser';
import { Utility } from '../service/utility';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  private currentUser: CurrentUser;

  constructor() {
    this.currentUser = new CurrentUser();
    const sessionUser = Utility.getSessionUser();
    if (sessionUser) {
      const user = JSON.parse(sessionUser);
      this.currentUser = Utility.updateCurrentUser(this.currentUser, user);
    }
  }

  public getCurrentUser() {
    return this.currentUser;
  }
}
