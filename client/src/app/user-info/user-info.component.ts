import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {UserService} from "../services/user.service";
import {ProfAreaService} from "../services/prof-area.service";
import {ProjectService} from "../services/project.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})

export class UserInfoComponent implements OnInit {

  userSource: User;
  userToCheck: User;
  statusCode: number;
  requestProcessing = false;
  statusCodeUser: number;

  constructor(
    private userService: UserService,
    private profAreaService: ProfAreaService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
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
          this.getUserInfo()
        },
        errorCode => {
          this.statusCodeUser = errorCode;
          if (errorCode === 404) {
            this.router.navigate(['/login']);
          }
        });
  }

  getUserInfo() {
    this.userService.getUserById(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        data => {
          this.userToCheck = data;
        },
        errorCode => this.statusCodeUser);
  }

  logout() {
    this.userService.logout().subscribe(
      () => {
        this.router.navigate(['/start-page']);
      },
      () => this.statusCodeUser
    )
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.requestProcessing = true;
  }
}
