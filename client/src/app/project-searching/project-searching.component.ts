import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfArea} from "../table-classes/prof-area";
import {ProfAreaService} from "../services/prof-area.service";
import {ProjectService} from "../services/project.service";

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.css']
})

export class ProjectSearchingComponent implements OnInit {

  userSource: User;
  statusCode: number;
  requestProcessing = false;
  statusCodeUser: number;
  profAreaForm: FormGroup;
  tagForm: FormGroup;
  profAreaFilterArray: ProfArea[] = null;
  tagFilterArray: string[] = null;
  profAreas: ProfArea[];

  constructor(
    private userService: UserService,
    private profAreaService: ProfAreaService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.profAreaForm = new FormGroup({
        profArea: new FormControl('profArea', Validators.required),
      });
    this.tagForm = new FormGroup({
      tag: new FormControl('tag', Validators.required),
    });

    this.getUser("????");

    this.profAreaService.getAllProfAreas()
      .subscribe(data => this.profAreas = data);
  }

  getUser(userLogin: string) {
    this.userService.getUserByLogin(userLogin)
      .subscribe(
        data => {this.userSource = data; },
        errorCode => this.statusCodeUser);
  }

  onProfAreaFormSubmit() {
    if (this.profAreaForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create
    this.preProcessConfigurations();
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
    // Form is valid, now perform create
    let tag = this.tagForm.get('tag').value;

    this.tagFilterArray.push(tag);
  }

  deleteTagFilter(tag: String) {
    this.tagFilterArray = this.tagFilterArray.filter(item => item !== tag);
  }

  deleteProfAreaFilter(profArea: ProfArea) {
    this.profAreaFilterArray = this.profAreaFilterArray.filter(item => item !== profArea);
  }

  filter(){
    this.projectService.getFilteredProjects()
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.requestProcessing = true;
  }

}
