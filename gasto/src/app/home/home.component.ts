import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { Message } from '../service/message';

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
  
  constructor(private authentication: AuthenticationService, private router: Router){
    this.title = "Gasto";
    this.nextPage = "record";
  }

  loginOrSignUp() {
    if (this.authentication.getCurrentUser().getUID()){
      this.router.navigate([this.nextPage]);
      return;
    }
    this.authentication.loginOrSignUp().then((result) => {
      const user = this.authentication.getCurrentUser();
      if (user) {
        showSuccessMessage(Message.login_success);
        this.router.navigate([this.nextPage]);
      } else {
        showErrorMessage(Message.login_faliure);
      }
    }).catch((error) => {
      showErrorMessage(Message.login_faliure);
    });
  }

}
