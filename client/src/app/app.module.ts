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
import {AccordionModule} from "ngx-accordion";
import {LkComponent} from "./lk/lk.component";
import {ProjectSearchingComponent} from "./project-searching/project-searching.component";
import {CreateProjectComponent} from "./create-project/create-project.component";
import {MyHammerConfig} from "angular2-carousel/src/carousel.module";
import {MyProjectsComponent} from "./my-projects/my-projects.component";
import {ParticipationsComponent} from "./participations/participations.component";
import {UserSearchingComponent} from "./user-searching/user-searching.component";
import {
  MatAccordion, MatButtonModule, MatCheckboxModule, MatExpansionModule,
  MatExpansionPanel
} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    RegistrationComponent,
    LoginComponent,
    LkComponent,
    ProjectSearchingComponent,
    CreateProjectComponent,
    MyProjectsComponent,
    ParticipationsComponent,
    UserSearchingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    HttpModule,
    AccordionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule
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
