import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.css']
})

export class ParticipationsComponent implements OnInit {

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
