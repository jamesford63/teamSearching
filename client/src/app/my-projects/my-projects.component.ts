
import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../table-classes/project";
import {ProjectService} from "../services/project.service";

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})

export class MyProjectsComponent implements OnInit {

  userSource: User;
  statusCode: number;
  requestProcessing = false;
  statusCodeUser: number;
  userProjects: Project[] = [];
  project: Project;
  statusCodeProjects: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router) {}

  ngOnInit(){
    this.getUser();
  }

  getUser() {
    this.preProcessConfigurations();
    this.userService.getCurrentUser()
      .subscribe(
        data => {this.userSource = data;
        this.getUserProjects();},
        errorCode => this.statusCodeUser);
  }

  getUserProjects(){
      this.projectService.getUserProjects(this.userSource.id)
        .subscribe(
          data => {this.userProjects = data; },
          errorCode => this.statusCodeProjects);
  }

  redirectToProject(project){
    this.router.navigate(['/project/' + project.id]);
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.requestProcessing = true;
  }

}
