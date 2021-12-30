import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title: string;
  
  constructor(private authentication: AuthenticationService, private router: Router){
    this.title = "Gasto";
  }

  loginOrSignUp() {
    if (this.authentication.getCurrentUser().getUID()){
      this.router.navigate(['/record']);
      return;
    }
    this.authentication.loginOrSignUp().then((result) => {
      const user = this.authentication.getCurrentUser();
      if (user) {
        this.router.navigate(['record']);
      } else {
        console.error("AppComponent :: loginOrSignUp :: Error occured while fetching user info after login");
      }
    }).catch((error) => {
      console.error("AppComponent :: loginOrSignUp :: Error occured while user login");
    });
  }

}
