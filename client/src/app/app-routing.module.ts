import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPageComponent} from "./start-page/start-page.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./authorization/login.component";

const routes: Routes = [
  { path: 'start-page', component: StartPageComponent},
  { path: '', redirectTo: 'start-page', pathMatch: 'full'},
  { path: 'user-reg', component: RegistrationComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
