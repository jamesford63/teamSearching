
import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(){
    this.getUser("????");
  }

  getUser(userLogin: string) {
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
