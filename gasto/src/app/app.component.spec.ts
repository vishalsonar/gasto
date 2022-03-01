import { TestBed } from '@angular/core/testing';
import { NavigationStart, Router } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';
import { AuthenticationService } from './service/authentication.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(AuthenticationService),
        MockComponent(Router),
        MockComponent(NavigationStart)
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
