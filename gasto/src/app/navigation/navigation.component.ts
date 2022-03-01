import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { i18n } from '../i18n/i18n';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  public title: string;
  public i18n: i18n;

  constructor(private authentication: AuthenticationService, private router: Router) {
    this.title = "Gasto";
    this.i18n = new i18n();
    if (!this.authentication.getCurrentUser().getUID()){
      this.router.navigate(['/logout']);
    }
  }

  public signOut() {
    this.authentication.signOut().then((result) => {
      sessionStorage.clear();
      this.authentication.resetCurrentUser();
      this.router.navigate(['/logout']);
    }).catch((error) => {
      console.error("NavigationComponent :: signOut :: Error occured while user sigout");
    });
  }

}
