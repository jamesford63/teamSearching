import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfArea} from "../table-classes/prof-area";
import {ProfAreaService} from "../services/prof-area.service";
import {ProjectService} from "../services/project.service";
import {Project} from "../table-classes/project";
import {FilterRequest} from "../table-classes/filter-request";
import {Tag} from "../table-classes/tag";
import {NotificationService} from "../services/notification.service";
import {UUID} from "angular2-uuid";
import {NotificationType} from "../table-classes/notification-type";
import {NotificationStatus} from "../table-classes/notification-status";
import {Notification} from "../table-classes/notification";

@Component({
  selector: 'app-user-searching',
  templateUrl: './user-searching.component.html',
  styleUrls: ['./user-searching.component.css']
})

export class UserSearchingComponent implements OnInit {

  userSource: User;
  statusCode: number;
  requestProcessing = false;
  statusCodeUser: number;
  statusCodeUsers: number;
  statusCodeProfArea: number;
  statusCodeNotification: number;
  statusCodeProjects: number;
  profAreaForm: FormGroup;
  tagForm: FormGroup;
  descriptionForm: FormGroup;
  nameForm: FormGroup;
  cityForm: FormGroup;
  projectForm: FormGroup;
  profAreaFilterArray: ProfArea[] = null;
  tagFilterArray: Tag[] = null;
  filterRequest: FilterRequest = new FilterRequest('', [], [], '', '');
  profAreas: ProfArea[];
  filteredUsers: User[];
  userProjects: Project[];
  error: boolean = false;

  constructor(
    private userService: UserService,
    private profAreaService: ProfAreaService,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.profAreaForm = new FormGroup({
      profArea: new FormControl('', Validators.required),
    });
    this.tagForm = new FormGroup({
      tag: new FormControl('', Validators.required),
    });
    this.descriptionForm = new FormGroup({
      description: new FormControl('', Validators.required),
    });
    this.nameForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.cityForm = new FormGroup({
      city: new FormControl('', Validators.required),
    });

    this.projectForm = new FormGroup({
      project: new FormControl('', Validators.required),
    });

    this.getUser();
  }

  getUser() {
    this.preProcessConfigurations();
    this.userService.getCurrentUser()
      .subscribe(
        data => {
          this.userSource = data;
          this.getAllProfAreas();
          this.getAllUsers();
          this.getUserProjects();
        },
        errorCode => {
          this.statusCodeUser = errorCode;
          if (errorCode === 404) {
            this.router.navigate(['/login']);
          }
        });
  }

  getUserProjects() {
    this.preProcessConfigurations();
    this.projectService.getUserProjects(this.userSource.id)
      .subscribe(
        data => {
          this.userProjects = data;
        },
        errorCode => this.statusCodeProjects);
  }

  getAllProfAreas() {
    this.preProcessConfigurations();
    this.profAreaService.getAllProfAreas()
      .subscribe(
        data => {
          this.profAreas = data;
        },
        errorCode => this.statusCodeProfArea);
  }

  getAllUsers() {
    this.preProcessConfigurations();
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.filteredUsers = data;
          this.removeMyName()
        },
        errorCode => this.statusCodeUsers);
  }

  removeMyName() {
    this.filteredUsers = this.filteredUsers.filter(item => item.id !== this.userSource.id);
  }

  onProfAreaFormSubmit() {
    if (this.profAreaForm.invalid) {
      return; // Validation failed, exit from method.
    }
    this.profAreaFilterArray = this.profAreaFilterArray || [];
    // Form is valid, now perform create
    let profArea = this.profAreaForm.get('profArea').value.trim();
    for (const a of this.profAreas) {
      if (a.id == profArea) {
        profArea = a;
      }
    }
    let was = false;
    for (var i = 0; i < this.profAreaFilterArray.length; i++) {
      if (profArea == this.profAreaFilterArray[i]) {
        was = true;
        break;
      }
    }
    if (!was) this.profAreaFilterArray.push(profArea);
  }

  onTagFormSubmit() {
    if (this.tagForm.invalid) {
      return; // Validation failed, exit from method.
    }
    this.tagFilterArray = this.tagFilterArray || [];
    // Form is valid, now perform create
    let tag = this.tagForm.get('tag').value.trim();

    let was = false;
    for (var i = 0; i < this.tagFilterArray.length; i++) {
      if (tag == this.tagFilterArray[i].name) {
        was = true;
        break;
      }
    }
    let newTag = new Tag(UUID.UUID(), tag);
    if (!was) this.tagFilterArray.push(newTag);

    this.tagForm.reset();
  }

  deleteTagFilter(tag: Tag) {
    this.tagFilterArray = this.tagFilterArray.filter(item => item !== tag);
  }

  deleteProfAreaFilter(profArea: ProfArea) {
    this.profAreaFilterArray = this.profAreaFilterArray.filter(item => item !== profArea);
  }

  filter() {
    this.preProcessConfigurations();

    let name = this.nameForm.get('name').value;
    this.filterRequest.name = name;

    let description = this.descriptionForm.get('description').value;
    this.filterRequest.description = description;

    let city = this.cityForm.get('city').value;
    this.filterRequest.city = city;

    this.filterRequest.tags = this.tagFilterArray;
    this.filterRequest.profAreas = this.profAreaFilterArray;

    this.userService.getFilteredUsers(this.filterRequest)
      .subscribe(
        data => {
          this.filteredUsers = data;
          this.filteredUsers = this.filteredUsers.filter(item => item !== this.userSource);
        },
        errorCode => this.statusCodeUsers);
  }

  sendRequestToUser(user: User) {
    let project = this.projectForm.get('project').value.trim();
    for (const a of this.userProjects) {
      if (a.id == project) {
        project = a;
      }
    }
    if (project == '') {
      this.error = true;
      return;
    }
    else {
      this.error = false;
      this.preProcessConfigurations();
      let request = new Notification(UUID.UUID(), NotificationType.REQUEST, this.userSource, user, this.userProjects[0],
        NotificationStatus.UNREAD, "Привет! Приглашаю принять участие в моем никчемном проекте!:)");
      this.notificationService.createNotification(request)
        .subscribe(successCode => {
            this.statusCodeNotification = successCode;
          },
          errorCode => this.statusCodeNotification = errorCode);
    }
  }

  clearFilter() {
    this.nameForm.reset();
    this.descriptionForm.reset();
    this.tagForm.reset();
    this.cityForm.reset();
    this.tagFilterArray = [];
    this.profAreaFilterArray = [];
    this.filterRequest = new FilterRequest('', [], [], '', '');
    this.getAllUsers();
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.statusCodeUsers = null;
    this.requestProcessing = true;
  }

}
