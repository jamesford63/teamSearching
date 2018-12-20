
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
import {Tag} from "../table-classes/tag";
import {TagService} from "../services/tag.service";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  statusCode: number;
  statusCodeProject: number;
  statusCodeProfArea: number;
  statusCodeTag: number;
  requestProcessing = false;
  userSource: User;
  statusCodeUser: number;
  nameForm: FormGroup;
  profAreaForm: FormGroup;
  tagForm: FormGroup;
  descriptionForm: FormGroup;
  profAreaArray: ProfArea[] = [];
  tagArray: Tag[] = [];
  profAreas: ProfArea[];
  newProject: Project = new Project(UUID.UUID(),'',[],[],this.userSource,[],'',ProjectStatus.OPEN);
  created : boolean = false;

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
    this.created = false;
    this.getUser();
    this.getAllProfAreas();

  }

  constructor(private userService: UserService,
              private router: Router,
              private profAreaService: ProfAreaService,
              private projectService: ProjectService,
              private tagService: TagService) { }


  getUser() {
    this.preProcessConfigurations();
    this.userService.getCurrentUser()
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
    for(const a of this.profAreaArray){
      if(a.id == profArea){
        return;
      }
    }
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
    let tag = this.tagForm.get('tag').value.trim();
    for(const a of this.tagArray){
      if(tag == a.name){
        this.tagForm.reset();
        return;
      }
    }
    let newTag = new Tag(UUID.UUID(),tag);
    this.tagService.createTag(newTag);
    this.tagArray.push(newTag);
    this.tagForm.reset();
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
    if(name == null){
      name = '';
      this.newProject.name = name;
    }
    else this.newProject.name = name;

  }


  deleteTag(tag: Tag) {
    this.tagArray = this.tagArray.filter(item => item !== tag);
  }

  deleteProfArea(profArea: ProfArea) {
    this.profAreaArray = this.profAreaArray.filter(item => item !== profArea);
  }

  createProject(){
    this.preProcessConfigurations()
    this.onNameFormSubmit();
    this.onDescriptionFormSubmit();
    const project = new Project(UUID.UUID(), this.newProject.name, this.profAreaArray, null,
                                this.userSource,this.tagArray,this.newProject.description,
                                ProjectStatus.OPEN)
    this.projectService.createProject(project)
      .subscribe(successCode => {
          this.statusCodeProject = successCode;
          this.newProject = null;
        },
        errorCode => this.statusCodeProject = errorCode);

    this.userSource.projectsCreated.push(project.id);

    this.userService.updateUser(this.userSource)
      .subscribe(successCode => {
        this.statusCodeUser = successCode;
      }, errorCode =>
        this.statusCodeUser = errorCode);
    this.tagArray = [];
    this.profAreaArray = [];
    this.nameForm.reset();
    this.descriptionForm.reset();
    this.tagForm.reset();
    this.created = true;
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.statusCodeProject = null;
    this.requestProcessing = true;
    this.statusCodeProfArea = null;
  }

}
