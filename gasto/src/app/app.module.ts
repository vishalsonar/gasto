import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { RecordComponent } from './record/record.component';
import { DetailComponent } from './detail/detail.component';
import { StatementComponent } from './statement/statement.component';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";

const routes: Routes = [
  {path: 'gasto', component: AppComponent},
  {path: 'record', component: RecordComponent},
  {path: 'detail', component: DetailComponent},
  {path: 'home', component: HomeComponent},
  {path: 'statement', component: StatementComponent},
  {path: 'logout', redirectTo: '/gasto', pathMatch: 'full'},
  {path: '', redirectTo: '/gasto', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    RecordComponent,
    DetailComponent,
    StatementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
