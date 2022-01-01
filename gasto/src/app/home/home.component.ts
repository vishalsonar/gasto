import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

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
        this.router.navigate([this.nextPage]);
      } else {
        console.error("AppComponent :: loginOrSignUp :: Error occured while fetching user info after login");
      }
    }).catch((error) => {
      console.error("AppComponent :: loginOrSignUp :: Error occured while user login");
    });
  }

}
