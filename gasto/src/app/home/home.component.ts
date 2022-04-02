import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { i18n } from '../i18n/i18n';
import { Utility } from '../service/utility';

declare function showSuccessMessage(message: any): any;
declare function showErrorMessage(message: any): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public title: string;
  public nextPage: string;
  public i18n: i18n;
  public enFlag: boolean;
  public hiFlag: boolean;
  
  constructor(private authentication: AuthenticationService, private router: Router) {
    this.i18n = new i18n();
    this.title = "Gasto";
    this.nextPage = "record";
    this.enFlag = true;
    this.hiFlag = false;
  }

  en() {
    Utility.setLanguage("en");
    this.enFlag = true;
    this.hiFlag = false;
  }

  hi() {
    Utility.setLanguage("hi");
    this.enFlag = false;
    this.hiFlag = true;
  }

  loginOrSignUp() {
    if (this.authentication.getCurrentUser().getUID()){
      this.router.navigate([this.nextPage]);
      return;
    }
    this.authentication.loginOrSignUp().then((result) => {
      const user = this.authentication.getCurrentUser();
      if (user) {
        showSuccessMessage(this.i18n.getText("34"));
        this.router.navigate([this.nextPage]);
      } else {
        showErrorMessage(this.i18n.getText("35"));
      }
    }).catch((error) => {
      showErrorMessage(this.i18n.getText("35"));
    });
  }

}
