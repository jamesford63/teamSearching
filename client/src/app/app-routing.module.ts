import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPageComponent} from "./start-page/start-page.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./authorization/login.component";
import {LkComponent} from "./lk/lk.component";
import {ProjectSearchingComponent} from "./project-searching/project-searching.component";
import {CreateProjectComponent} from "./create-project/create-project.component";
import {UserSearchingComponent} from "./user-searching/user-searching.component";
import {MyProjectsComponent} from "./my-projects/my-projects.component";
import {ParticipationsComponent} from "./participations/participations.component";
import {ProjectComponent} from "./project/project.component";
import {ProjectInfoComponent} from "./project-info/project-info.component";

const routes: Routes = [
  { path: '', redirectTo: 'start-page', pathMatch: 'full'},
  { path: 'start-page', component: StartPageComponent},
  { path: 'user-reg', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'lk', component: LkComponent},
  { path: 'project-searching', component: ProjectSearchingComponent},
  { path: 'create-project', component: CreateProjectComponent},
  { path: 'user-searching', component: UserSearchingComponent},
  { path: 'my-projects', component: MyProjectsComponent},
  { path: 'participations', component: ParticipationsComponent},
  { path: 'project/:id', component: ProjectComponent},
  { path: 'project-info/:id', component: ProjectInfoComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
