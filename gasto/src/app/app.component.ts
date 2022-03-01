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
  public isCategoryActive = false;
  public isStatisticsActive = false;
  public isReportActive = false;

  private resetFlag() {
    this.isHomePageActive = false;
    this.isNavigationActive = true;
    this.isRecordActive = false;
    this.isDetailActive = false;
    this.isStatementActive = false;
    this.isCategoryActive = false;
    this.isStatisticsActive = false;
    this.isReportActive = false;
  }
  
  constructor(private router: Router, private authentication: AuthenticationService) { }

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
        if (path['url'] == "/category") {
          this.resetFlag();
          this.isCategoryActive = true;
        }
        if (path['url'] == "/statistics") {
          this.resetFlag();
          this.isStatisticsActive = true;
        }
        if (path['url'] == "/report") {
          this.resetFlag();
          this.isReportActive = true;
        }
      }
    });
  }
  
}
