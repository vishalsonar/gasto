import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isHomePageActive = true;
  public isNavigationActive = false;
  public isRecordActive = false;
  public isDetailActive = false;
  public isStatementActive = false;

  private resetFlag() {
    this.isHomePageActive = false;
    this.isNavigationActive = true;
    this.isRecordActive = false;
    this.isDetailActive = false;
    this.isStatementActive = false;
  }
  
  constructor(private router: Router, private authentication: AuthenticationService,) { }

  ngOnInit(): void {
    this.router.events.subscribe(path => {
      if (path instanceof NavigationStart) {
        if (path['url'] == "/logout") {
          this.resetFlag();
          this.isNavigationActive = false;
          this.isHomePageActive = true;
        }
        if (path['url'] == "/record") {
          this.resetFlag();
          this.isRecordActive = true;
        }
        if (path['url'] == "/detail") {
          this.resetFlag();
          this.isDetailActive = true;
        }
        if (path['url'] == "/statement") {
          this.resetFlag();
          this.isStatementActive = true;
        }
      }
    });
  }
  
}
