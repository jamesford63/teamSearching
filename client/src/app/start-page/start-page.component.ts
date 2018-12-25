import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../services/user.service";
import {User} from "../table-classes/user";
import {isSuccess} from "@angular/http/src/http_utils";


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  statusCode: number;
  userSource: User;
  isAuthorized: boolean;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.isAuthorized = false;
    this.userService.getCurrentUser()
      .subscribe(data => {
          this.userSource = data;
          this.isAuthorized = true;
        },
        errorCode => this.statusCode);
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
  }
}
