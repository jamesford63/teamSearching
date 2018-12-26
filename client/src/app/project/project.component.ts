import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../table-classes/project";
import {ProjectService} from "../services/project.service";
import {ProfAreaService} from "../services/prof-area.service";
import {TagService} from "../services/tag.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfArea} from "../table-classes/prof-area";
import {Tag} from "../table-classes/tag";
import {Notification} from "../table-classes/notification";
import {ProjectStatus} from "../table-classes/project-status";
import {UUID} from "angular2-uuid";
import {NotificationService} from "../services/notification.service";
import {NotificationType} from "../table-classes/notification-type";
import {NotificationStatus} from "../table-classes/notification-status";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  userSource: User;
  projectSource: Project;
  projectTags: Tag[];
  projectProfAreas: ProfArea[];
  projectStatus: ProjectStatus;
  profAreas: ProfArea[];
  statusCode: number;
  requestProcessing = false;
  statusCodeUser: number;
  statusCodeProject: number;
  statusCodeProfArea: number;
  statusCodeNotification: number;
  edited: boolean = false;

  nameForm: FormGroup;
  profAreaForm: FormGroup;
  tagForm: FormGroup;
  descriptionForm: FormGroup;
  cityForm: FormGroup;

  isDeleted: boolean = false;
  haveParticipants: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private profAreaService: ProfAreaService,
    private tagService: TagService,
    private notificationService: NotificationService,
    private router: Router) {
  }

  ngOnInit() {
    this.nameForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.profAreaForm = new FormGroup({
      profArea: new FormControl('', Validators.required),
    });
    this.tagForm = new FormGroup({
      tag: new FormControl('', Validators.required),
    });
    this.descriptionForm = new FormGroup({
      description: new FormControl('', Validators.required),
    });
    this.cityForm = new FormGroup({
      city: new FormControl('', Validators.required),
    });
    this.getUser();
    this.getAllProfAreas();
    this.isDeleted = false;
    this.edited = false;
  }

  getUser() {
    this.preProcessConfigurations();
    this.userService.getCurrentUser()
      .subscribe(
        data => {
          this.userSource = data;
          this.loadProjectToEdit(this.route.snapshot.paramMap.get('id'));
        },
        errorCode => {
          this.statusCodeUser = errorCode;
          if (errorCode === 404) {
            this.router.navigate(['/login']);
          }
        });
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

  checkParticipants() {
    if (this.projectSource.participants.length != 0)
      this.haveParticipants = true;
    console.log(this.haveParticipants);
  }

  onProfAreaFormSubmit() {
    if (this.profAreaForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    let profArea = this.profAreaForm.get('profArea').value.trim();
    for (const a of this.projectProfAreas) {
      if (a.id == profArea) {
        return;
      }
    }
    for (const a of this.profAreas) {
      if (a.id == profArea) {
        profArea = a;
      }
    }
    this.projectProfAreas.push(profArea);
    this.profAreaForm.reset();
  }

  onTagFormSubmit() {
    if (this.tagForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    let tag = this.tagForm.get('tag').value.trim();
    for (const a of this.projectTags) {
      if (tag == a.name) {
        this.tagForm.reset();
        return;
      }
    }
    let newTag = new Tag(UUID.UUID(), tag);
    this.tagService.createTag(newTag);
    this.projectTags.push(newTag);
    this.tagForm.reset();
  }

  onDescriptionFormSubmit() {
    if (this.descriptionForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    let description = this.descriptionForm.get('description').value;

    this.projectSource.description = description;
  }

  onCityFormSubmit() {
    if (this.cityForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    let city = this.cityForm.get('city').value;

    this.projectSource.city = city;
  }

  onNameFormSubmit() {
    if (this.nameForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    let name = this.nameForm.get('name').value;
    if (name == null) {
      name = '';
      this.projectSource.name = name;
    }
    else this.projectSource.name = name;
  }

  deleteTag(tag: Tag) {
    this.projectTags = this.projectTags.filter(item => item !== tag);
  }

  deleteProfArea(profArea: ProfArea) {
    this.projectProfAreas = this.projectProfAreas.filter(item => item !== profArea);
  }

  loadProjectToEdit(id) {
    if (this.projectSource == null) {
      this.projectService.getProject(id)
        .subscribe(
          data => {
            this.projectSource = data;
            console.log(this.projectSource);
            this.nameForm.setValue({
              name: data.name
            });
            this.descriptionForm.setValue({
              description: data.description
            });
            this.cityForm.setValue({
              city: data.city
            });
            this.projectTags = data.tags;
            this.projectProfAreas = data.profArea;
            this.checkParticipants();
          },
          errorCode => this.statusCodeProject);
    }
    else {
      this.projectService.getProject(id)
        .subscribe(
          data => {
            this.projectSource = data;
            console.log(this.projectSource);
            this.nameForm.setValue({
              name: data.name
            });
            this.cityForm.setValue({
              city: data.city
            });
            this.descriptionForm.setValue({
              description: data.description
            });
            this.projectTags = data.tags;
            this.projectProfAreas = data.profArea;
          },
          errorCode => this.statusCodeProject);
    }
  }

  updateProject() {
    this.preProcessConfigurations();
    this.onNameFormSubmit();
    this.onDescriptionFormSubmit();
    this.onCityFormSubmit();
    this.projectSource.profArea = this.projectProfAreas;
    this.projectSource.tags = this.projectTags;
    this.projectService.updateProject(this.projectSource)
      .subscribe(successCode => {
          this.statusCodeProject = successCode;
        },
        errorCode => this.statusCodeProject = errorCode);
    this.edited = true;
  }

  deleteProject() {
    this.projectService.deleteProject(this.projectSource.id)
      .subscribe(successCode => {
          this.statusCodeProject = successCode;
          this.isDeleted = true;
        },
        errorCode => this.statusCodeProject = errorCode);
    this.userSource.projectsCreated = this.userSource.projectsCreated.filter(item =>
      item !== this.projectSource.id);
    this.userSource.password = null;
    this.userService.updateUser(this.userSource)
      .subscribe(successCode => {
          this.statusCodeUser = successCode;
        },
        errorCode => this.statusCodeUser = errorCode);
  }

  removeParticipant(user) {
    let notification = new Notification(UUID.UUID(), NotificationType.FIREDINFO, this.userSource,
      user, this.projectSource, NotificationStatus.UNREAD, "Вы слишком дорого обходитесь нашему проекту. Вы уволены!");

    this.notificationService.createNotification(notification)
      .subscribe(successCode => {
          this.statusCodeNotification = successCode;
        },
        errorCode => this.statusCodeNotification = errorCode);

    this.projectSource.participants = this.projectSource.participants.filter(item => item !== user);
    this.projectService.updateProject(this.projectSource)
      .subscribe(successCode => {
          this.statusCodeProject = successCode;
        },
        errorCode => this.statusCodeProject = errorCode);
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
    this.statusCodeUser = null;
    this.requestProcessing = true;
  }

}
