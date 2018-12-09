import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../table-classes/project";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  userSource: User;
  projectSource: Project;
  statusCode: number;
  requestProcessing = false;
  statusCodeUser: number;
  statusCodeProject: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(){
    this.getUser("????");
  }

  getUser() {
    this.preProcessConfigurations();
    this.userService.getCurrentUser()
      .subscribe(
        data => {this.userSource = data; },
        errorCode => this.statusCodeUser);
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.requestProcessing = true;
  }

}
