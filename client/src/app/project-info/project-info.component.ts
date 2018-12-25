import {Component, OnInit} from "@angular/core";
import {ProfArea} from "../table-classes/prof-area";
import {Tag} from "../table-classes/tag";
import {Project} from "../table-classes/project";
import {User} from "../table-classes/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../services/project.service";
import {ProfAreaService} from "../services/prof-area.service";
import {TagService} from "../services/tag.service";

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})

export class ProjectInfoComponent implements OnInit {
  userSource: User;
  projectSource: Project;
  statusCode: number;
  requestProcessing = false;
  statusCodeUser: number;
  statusCodeProject: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.preProcessConfigurations();
    this.userService.getCurrentUser()
      .subscribe(
        data => {
          this.userSource = data;
          this.loadProject(this.route.snapshot.paramMap.get('id'));
        },
        errorCode => {
          this.statusCodeUser = errorCode;
          if (errorCode === 404) {
            this.router.navigate(['/login']);
          }
        });
  }

  loadProject(id) {
    this.preProcessConfigurations();
    this.projectService.getProject(id)
      .subscribe(
        data => {
          this.projectSource = data;
        },
        errorCode => this.statusCodeProject);
  }

  logout() {
    this.userService.logout().subscribe(
      () => {
        this.router.navigate(['/start-page']);
      },
      () => {
        this.router.navigate(['/start-page']);
      }
    )
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.requestProcessing = true;
    this.statusCodeProject = null;
  }
}
