import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../services/project.service";
import {Project} from "../table-classes/project";

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.css']
})

export class ParticipationsComponent implements OnInit {

  userSource: User;
  userParticipations: Project[] = [];
  statusCode: number;
  requestProcessing = false;
  statusCodeUser: number;
  statusCodeParticipations: number;

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
        console.log(data);
        this.getMyParticipations()},
        errorCode => this.statusCodeUser);
  }

  getMyParticipations(){
    for(var i = 0; i < this.userSource.projectsParticipated.length; i++) {
      this.projectService.getProject(this.userSource.projectsParticipated[i])
        .subscribe(
          data => {
            console.log(data);
            this.userParticipations.push(data);
          },
          errorCode => this.statusCodeParticipations);
    }
  }

  redirectToProject(project){
    this.router.navigate(['/project-info/' + project.id]);
  }


  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.requestProcessing = true;
  }

}
