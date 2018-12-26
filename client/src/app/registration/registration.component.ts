import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {User} from "../table-classes/user";
import {UUID} from "angular2-uuid";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  statusCode: number;
  processValidation = false;

  registrationForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  onRegistrationFormSubmit() {
    this.processValidation = true;
    if (this.registrationForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    this.preProcessConfigurations();
    const login = this.registrationForm.get('login').value.trim();
    const password = this.registrationForm.get('password').value.trim();
    const name = this.registrationForm.get('name').value.trim();
    const lastName = this.registrationForm.get('lastName').value.trim();
    const city = this.registrationForm.get('city').value.trim();
    const email = this.registrationForm.get('email').value;
    // Handle create user
    const user = new User(UUID.UUID(), login, password, email, name, lastName, city, [], [], [], [], 0, '');
    this.userService.createUser(user)
      .subscribe(successCode => {
          this.statusCode = successCode;
          this.backToCreateClient();
          this.userService.authorize(login, password)
            .subscribe(next => this.router.navigate(['/lk']));
        },
        errorCode => {
          this.statusCode = errorCode.toString().replace('Error:', '');
          console.log(this.statusCode);
        });

  }

  preProcessConfigurations() {
    this.statusCode = null;
  }

  backToCreateClient() {
    this.registrationForm.reset();
    this.processValidation = false;
  }


}
