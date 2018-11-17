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

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    NotificationService,
    NotificationTypeService,
    ProfAreaService,
    ProjectService,
    TagService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
