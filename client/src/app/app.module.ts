import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StartPageComponent} from "./start-page/start-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "./services/user.service";
import {NotificationService} from "./services/notification.service";
import {NotificationTypeService} from "./services/notification-type.service";
import {ProfAreaService} from "./services/prof-area.service";
import {ProjectService} from "./services/project.service";
import {CarouselModule} from "angular2-carousel";
import {RegistrationComponent} from "./registration/registration.component";
import {AppService} from "./services/app.service";
import {LoginComponent} from "./authorization/login.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";


@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [
    UserService,
    NotificationService,
    NotificationTypeService,
    ProfAreaService,
    ProjectService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
