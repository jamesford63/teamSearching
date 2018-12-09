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
  profAreaForm: FormGroup;
  tagForm: FormGroup;
  descriptionForm: FormGroup;
  nameForm: FormGroup;
  cityForm: FormGroup;
  profAreaFilterArray: ProfArea[] = null;
  tagFilterArray: string[] = null;
  filterRequest: FilterRequest = null;
  profAreas: ProfArea[];
  filteredUsers: Project[];

  constructor(
    private userService: UserService,
    private profAreaService: ProfAreaService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router) {}

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

    this.getUser();

    this.getAllProfAreas();
  }

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

    let profArea = this.profAreaForm.get('profArea').value.trim();
    for (const a of this.profAreas) {
      if (a.id == profArea) {
        profArea = a;
      }
    }
    this.profAreaFilterArray.push(profArea);
  }

  onTagFormSubmit() {
    if (this.tagForm.invalid) {
      return; // Validation failed, exit from method.
    }

    let tag = this.tagForm.get('tag').value;

    this.tagFilterArray.push(tag);
  }

  onDescriptionFormSubmit() {
    if (this.descriptionForm.invalid) {
      return; // Validation failed, exit from method.
    }

    let description = this.descriptionForm.get('description').value;

    this.filterRequest.description = description;
  }

  onNameFormSubmit() {
    if (this.nameForm.invalid) {
      return; // Validation failed, exit from method.
    }

    let name = this.nameForm.get('name').value;

    this.filterRequest.name = name;
  }

  onCityFormSubmit() {
    if (this.cityForm.invalid) {
      return; // Validation failed, exit from method.
    }

    let city = this.cityForm.get('city').value;

    this.filterRequest.city = city;
  }


  deleteTagFilter(tag: String) {
    this.tagFilterArray = this.tagFilterArray.filter(item => item !== tag);
  }

  deleteProfAreaFilter(profArea: ProfArea) {
    this.profAreaFilterArray = this.profAreaFilterArray.filter(item => item !== profArea);
  }

  filter(){
    this.preProcessConfigurations();
    this.filterRequest.tags = this.tagFilterArray;
    this.filterRequest.profAreas = this.profAreaFilterArray;
    this.projectService.getFilteredProjects(this.filterRequest)
      .subscribe(
        data => {this.filteredUsers = data; },
        errorCode => this.statusCodeUsers);
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.statusCodeUsers = null;
    this.requestProcessing = true;
  }

}
