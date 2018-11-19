import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StartPageComponent} from "./start-page/start-page.component";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "./services/user.service";
import {NotificationService} from "./services/notification.service";
import {NotificationTypeService} from "./services/notification-type.service";
import {ProfAreaService} from "./services/prof-area.service";
import {ProjectService} from "./services/project.service";
import {TagService} from "./services/tag.service";
import {CarouselModule} from "angular2-carousel";
import {RegistrationComponent} from "./registration/registration.component";
import {AppService} from "./services/app.service";


@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    NotificationService,
    NotificationTypeService,
    ProfAreaService,
    ProjectService,
    TagService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
