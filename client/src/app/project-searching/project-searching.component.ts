import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfArea} from "../table-classes/prof-area";
import {ProfAreaService} from "../services/prof-area.service";
import {ProjectService} from "../services/project.service";
import {FilterRequest} from "../table-classes/filter-request";
import {Notification} from "../table-classes/notification";
import {Project} from "../table-classes/project";
import {log} from "util";
import {NotificationType} from "../table-classes/notification-type";
import {UUID} from "angular2-uuid";
import {NotificationStatus} from "../table-classes/notification-status";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-project-searching',
  templateUrl: './project-searching.component.html',
  styleUrls: ['./project-searching.component.css']
})

export class ProjectSearchingComponent implements OnInit {

  userSource: User;
  statusCode: number;
  requestProcessing = false;
  statusCodeUser: number;
  statusCodeProjects: number;
  statusCodeProfArea: number;
  statusCodeNotification: number;
  profAreaForm: FormGroup;
  tagForm: FormGroup;
  descriptionForm: FormGroup;
  nameForm: FormGroup;
  profAreaFilterArray: ProfArea[] = null;
  tagFilterArray: string[] = null;
  filterRequest: FilterRequest = null;
  profAreas: ProfArea[] = [new ProfArea("1","assLeaking"),new ProfArea("2","cocksucking"),new ProfArea("3","dicksucking")];
  notificationTypes: NotificationType[];
  filteredProjects: Project[];

  constructor(
    private userService: UserService,
    private profAreaService: ProfAreaService,
    private projectService: ProjectService,
    private notification: Notification,
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

    this.getUser("????");

    this.getAllProfAreas();
  }

  getUser(userLogin: string) {
    this.preProcessConfigurations();
    this.userService.getUserByLogin(userLogin)
      .subscribe(
        data => {this.userSource = data; },
        errorCode => this.statusCodeUser);
  }

  getAllProfAreas(){
    this.preProcessConfigurations();
    this.profAreaService.getAllProfAreas()
      .subscribe(
        data => {this.profAreas = data; },
        errorCode => this.statusCodeProfArea);
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
    for(var i = 0; i<this.profAreaFilterArray.length; i++) {
      if (profArea == this.profAreaFilterArray[i]) {
        was = true;
        break;
      }
    }
    if(!was) this.profAreaFilterArray.push(profArea);

  }

  onTagFormSubmit() {
    if (this.tagForm.invalid) {
      return; // Validation failed, exit from method.
    }
    this.tagFilterArray = this.tagFilterArray || [];
    // Form is valid, now perform create
    let tag = this.tagForm.get('tag').value.trim();

    let was = false;
    for(var i = 0; i<this.tagFilterArray.length; i++) {
      if (tag == this.tagFilterArray[i]) {
        was = true;
        break;
      }
    }
    if(!was) this.tagFilterArray.push(tag);

    this.tagForm.reset();
  }

  deleteTagFilter(tag: String) {
    this.tagFilterArray = this.tagFilterArray.filter(item => item !== tag);
    console.log(this.tagFilterArray);
  }

  deleteProfAreaFilter(profArea: ProfArea) {
    this.profAreaFilterArray = this.profAreaFilterArray.filter(item => item !== profArea);
  }

  filter(){
    this.preProcessConfigurations();

    let name = this.nameForm.get('name').value;
    console.log(name);
    this.filterRequest.name = name;

    let description = this.descriptionForm.get('description').value;
    this.filterRequest.description = description;

    this.filterRequest.tags = this.tagFilterArray;
    this.filterRequest.profAreas = this.profAreaFilterArray;
    console.log(this.filterRequest);
    this.projectService.getFilteredProjects(this.filterRequest)
      .subscribe(
        data => {this.filteredProjects = data; },
        errorCode => this.statusCodeProjects);
  }

  sendRequestToOwner(project: Project){
    this.preProcessConfigurations();
    let request = new Notification(UUID.UUID(),NotificationType.REQUEST,this.userSource,project.owner,
                                    NotificationStatus.UNREAD, "Привет! Я заинтересован в участии в вашем проекте!");
    this.notificationService.createNotification(request)
      .subscribe(successCode => {
          this.statusCodeNotification = successCode;
        },
        errorCode => this.statusCodeNotification = errorCode);

  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.statusCodeProjects = null;
    this.statusCodeProfArea = null;
    this.statusCodeNotification = null;
    this.requestProcessing = true;
  }

}
