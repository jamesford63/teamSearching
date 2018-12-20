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
import {NotificationType} from "../table-classes/notification-type";
import {UUID} from "angular2-uuid";
import {NotificationStatus} from "../table-classes/notification-status";
import {NotificationService} from "../services/notification.service";
import {Tag} from "../table-classes/tag";

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
  tagFilterArray: Tag[] = null;
  filterRequest: FilterRequest = new FilterRequest('',[],[],'','');
  profAreas: ProfArea[];
  filteredProjects: Project[];

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

    this.getUser();
  }

  getUser() {
    this.preProcessConfigurations();
    this.userService.getCurrentUser()
      .subscribe(
        data => {this.userSource = data;
        this.getAllProjects();
        this.getAllProfAreas();
        this.getNotMyProjects()},
        errorCode => this.statusCodeUser);
  }

  getAllProfAreas(){
    this.preProcessConfigurations();
    this.profAreaService.getAllProfAreas()
      .subscribe(
        data => {this.profAreas = data; },
        errorCode => this.statusCodeProfArea);
  }

  getAllProjects(){
    this.preProcessConfigurations();
    this.projectService.getAllProjects()
      .subscribe(
        data => {
          this.filteredProjects = data;
          this.getNotMyProjects()},
        errorCode => this.statusCodeProjects);
  }

  getNotMyProjects(){
    for(var i = 0; i < this.userSource.projectsCreated.length; i++) {
      this.filteredProjects = this.filteredProjects.filter(item => item.id !== this.userSource.projectsCreated[i]);
    }
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
    let newTag = new Tag(UUID.UUID(),tag);
    if(!was) this.tagFilterArray.push(newTag);

    this.tagForm.reset();
  }

  deleteTagFilter(tag: Tag) {
    this.tagFilterArray = this.tagFilterArray.filter(item => item !== tag);
  }

  deleteProfAreaFilter(profArea: ProfArea) {
    this.profAreaFilterArray = this.profAreaFilterArray.filter(item => item !== profArea);
  }

  filter(){
    this.preProcessConfigurations();

    let name = this.nameForm.get('name').value;
    this.filterRequest.name = name;

    let description = this.descriptionForm.get('description').value;
    this.filterRequest.description = description;

    this.filterRequest.tags = this.tagFilterArray;
    this.filterRequest.profAreas = this.profAreaFilterArray;

    this.projectService.getFilteredProjects(this.filterRequest)
      .subscribe(
        data => {this.filteredProjects = data; },
        errorCode => this.statusCodeProjects);
    for(var i = 0; i<this.userSource.projectsCreated.length; i++) {
      this.filteredProjects = this.filteredProjects.filter(item => item.id !== this.userSource.projectsCreated[i]);
    }
  }

  sendRequestToOwner(project: Project){
    this.preProcessConfigurations();
    let request = new Notification(UUID.UUID(),NotificationType.REQUEST,this.userSource,project.owner,project,
     NotificationStatus.UNREAD, "Привет! Я заинтересован в участии в вашем никчемном проекте!:)");
    this.notificationService.createNotification(request)
      .subscribe(successCode => {
          this.statusCodeNotification = successCode;
        },
        errorCode => this.statusCodeNotification = errorCode);
  }

  clearFilter(){
    this.nameForm.reset();
    this.descriptionForm.reset();
    this.tagForm.reset();
    this.tagFilterArray = [];
    this.profAreaFilterArray = [];
    this.filterRequest = new FilterRequest('',[],[],'','');
    this.getAllProjects();
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
