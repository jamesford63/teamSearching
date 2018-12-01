
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../table-classes/user";
import {ProfArea} from "../table-classes/prof-area";
import {ProjectService} from "../services/project.service";
import {ProfAreaService} from "../services/prof-area.service";
import {Project} from "../table-classes/project";
import {UUID} from "angular2-uuid";
import {ProjectStatus} from "../table-classes/project-status";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  statusCode: number;
  statusCodeProject: number;
  statusCodeProfArea: number;
  requestProcessing = false;
  userSource: User;
  statusCodeUser: number;
  nameForm: FormGroup;
  profAreaForm: FormGroup;
  tagForm: FormGroup;
  descriptionForm: FormGroup;
  profAreaArray: ProfArea[] = null;
  tagArray: string[] = null;
  profAreas: ProfArea[];
  newProject: Project;

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

    this.getUser("????");
    this.getAllProfAreas();

  }

  constructor(private userService: UserService,
              private router: Router,
              private profAreaService: ProfAreaService,
              private projectService: ProjectService) { }


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
    // Form is valid, now perform create
    let profArea = this.profAreaForm.get('profArea').value.trim();
    for (const a of this.profAreas) {
      if (a.id == profArea) {
        profArea = a;
      }
    }
    this.profAreaArray.push(profArea);
  }

  onTagFormSubmit() {
    if (this.tagForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    let tag = this.tagForm.get('tag').value;

    this.tagArray.push(tag);
  }

  onDescriptionFormSubmit() {
    if (this.descriptionForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    let description = this.descriptionForm.get('description').value;

    this.newProject.description = description;
  }

  onNameFormSubmit() {
    if (this.nameForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    let name = this.nameForm.get('name').value;

    this.newProject.name = name;
  }


  deleteTagFilter(tag: String) {
    this.tagArray = this.tagArray.filter(item => item !== tag);
  }

  deleteProfAreaFilter(profArea: ProfArea) {
    this.profAreaArray = this.profAreaArray.filter(item => item !== profArea);
  }

  createProject(){
    this.preProcessConfigurations()
    const project = new Project(UUID.UUID(), this.newProject.name, this.profAreaArray, null,
                                this.userSource,this.tagArray,this.newProject.description,
                                ProjectStatus.OPEN)
    this.projectService.createProject(project)
      .subscribe(successCode => {
          this.statusCodeProject = successCode;
          this.newProject = null;
        },
        errorCode => this.statusCodeProject = errorCode);

    this.userSource.projectsCreated.push(project);

    this.userService.updateUser(this.userSource)
      .subscribe(successCode => {
        this.statusCodeUser = successCode;
      }, errorCode =>
        this.statusCodeUser = errorCode);
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.statusCodeProject = null;
    this.requestProcessing = true;
    this.statusCodeProfArea = null;
  }

}
