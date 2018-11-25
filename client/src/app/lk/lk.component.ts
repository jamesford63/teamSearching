import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../table-classes/user";
import {UserService} from "../services/user.service";
import {ProfAreaService} from "../services/prof-area.service";
import {ProfArea} from "../table-classes/prof-area";

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})

export class LkComponent implements OnInit {

  userSource: User;
  statusCode: number;
  userIdToUpdate = null;
  processValidationUser = false;
  requestProcessing = false;
  statusCodeUser: number;
  statusCodeTag: number;
  statusCodeProfArea: number;
  profAreas: ProfArea[];
  userForm: FormGroup;
  newTagForm: FormGroup;
  newProfAreaForm: FormGroup;

  constructor(
              private userService: UserService,
              private profAreaService: ProfAreaService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('name', Validators.required),
      lastName: new FormControl('lastName', Validators.required),
      login: new FormControl('login', Validators.required),
      password: new FormControl('password', Validators.required),
      email: new FormControl('email', Validators.required),
      city: new FormControl('city', Validators.required),
      description: new FormControl('description', Validators.required)
    });

    this.newTagForm = new FormGroup({
      tag: new FormControl('', Validators.required)
    });

    this.newProfAreaForm = new FormGroup({
      profArea: new FormControl('', Validators.required)
    });

    this.profAreaService.getAllProfAreas()
      .subscribe(data => this.profAreas = data);
    this.getUser("????");
    this.loadUserToEdit();
  }


  getUser(userLogin: string) {
    this.userService.getUserByLogin(userLogin)
      .subscribe(
        data => {this.userSource = data; },
        errorCode => this.statusCodeUser);
  }

  onUserFormSubmit() {
    this.processValidationUser = true;
    if (this.userForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform update
    this.preProcessConfigurations();
    const login = this.userForm.get('login').value;
    const password = this.userForm.get('password').value;
    const name = this.userForm.get('name').value;
    const lastName = this.userForm.get('lastName').value;
    const city = this.userForm.get('city').value;
    const email = this.userForm.get('email').value;
    const description = this.userForm.get('description').value;
    // Handle update user
    const user = new User(this.userSource.id, login, password, email, name, lastName,city, this.userSource.profAreas,
      this.userSource.tags, this.userSource.projectsCreated, this.userSource.projectsParticipated,
      this.userSource.userStatus, description);
    this.userService.updateUser(user)
      .subscribe(successCode => {
        this.statusCodeUser = successCode;
        this.getUser(this.userSource.login);
        this.userSource = user;
        this.loadUserToEdit();
        this.backToCreateUser();
      }, errorCode =>
        this.statusCodeUser = errorCode);
  }

  loadUserToEdit() {
    this.preProcessConfigurations();
    if (this.userSource == null) {
      this.userService.getUserByLogin("????")
        .subscribe(user => {
            this.userIdToUpdate = user.id;
            this.userForm.setValue({
              login: user.login,
              password: user.password,
              name: user.name,
              lastName: user.lastName,
              city: user.city,
              email: user.email,
              description: user.description});
            this.processValidationUser = true;
            this.requestProcessing = false;
            this.userSource = user;
          },
          errorCode =>  this.statusCodeUser = errorCode);
    } else {
      this.userService.getUserByLogin(this.userSource.login)
        .subscribe(user => {
            this.userIdToUpdate = user.id;
            this.userForm.setValue({
              login: user.login,
              password: user.password,
              name: user.name,
              lastName: user.lastName,
              city: user.city,
              email: user.email,
              description: user.description});
            this.processValidationUser = true;
            this.requestProcessing = false;
          },
          errorCode =>  this.statusCodeUser = errorCode);
    }
  }

  onNewProfAreaFormSubmit() {
    if (this.newProfAreaForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    this.preProcessConfigurations();
    let profArea = this.newProfAreaForm.get('profArea').value.trim();
    for (const a of this.profAreas) {
      if (a.id == profArea) {
        profArea = a;
      }
    }
    this.userSource.profAreas.push(profArea);
    this.userService.updateUser(this.userSource)
      .subscribe(successCode => {
        this.statusCodeUser = successCode;
        this.loadUserToEdit();
        this.backToCreateUser();
        this.backToCreateProfArea();
      }, errorCode =>
        this.statusCodeProfArea = errorCode);
  }

  onNewTagFormSubmit() {
    if (this.newTagForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    let tag = this.newTagForm.get('tag').value;

    this.userSource.tags.push(tag);
    this.userService.updateUser(this.userSource)
      .subscribe(successCode => {
        this.statusCodeUser = successCode;
        this.loadUserToEdit();
        this.backToCreateUser();
        this.backToCreateTag();
      }, errorCode =>
        this.statusCodeTag = errorCode);
  }

  deleteUserTag(tag: String) {
    this.userSource.tags = this.userSource.tags.filter(item => item !== tag);
    this.userService.updateUser(this.userSource)
      .subscribe(successCode => {
        this.statusCodeUser = successCode;
        this.loadUserToEdit();
        this.backToCreateUser();
      }, errorCode =>
        this.statusCodeTag = errorCode);
  }

  deleteUserProfArea(profArea: ProfArea) {
    this.userSource.profAreas = this.userSource.profAreas.filter(item => item !== profArea);
    this.userService.updateUser(this.userSource)
      .subscribe(successCode => {
        this.statusCodeUser = successCode;
        this.loadUserToEdit();
        this.backToCreateUser();
      }, errorCode =>
        this.statusCodeProfArea = errorCode);
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.requestProcessing = true;
  }

  backToCreateUser() {
    this.userIdToUpdate = null;
    this.processValidationUser = false;
  }

  backToCreateProfArea(){
    this.newProfAreaForm.reset();
  }

  backToCreateTag(){
    this.newTagForm.reset();
  }

}
