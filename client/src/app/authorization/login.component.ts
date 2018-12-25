import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from "../table-classes/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  statusCodeUser: number;
  requestProcessing = false;
  userSource: User;

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  onUserFormSubmit() {
    if (this.loginForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    this.preProcessConfigurations();
    const login = this.loginForm.get('login').value.trim();
    const password = this.loginForm.get('password').value.trim();
    this.userService.authorize(login, password)
      .subscribe(
        data => {
          this.userSource = data;
          this.router.navigate(['/lk']);
          console.log(data);
        },
        errorCode => {
          this.statusCodeUser = errorCode.toString().replace('Error:', '');
        });
  }

  preProcessConfigurations() {
    this.statusCodeUser = null;
    this.requestProcessing = true;
  }
}
