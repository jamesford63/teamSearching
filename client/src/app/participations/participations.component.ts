import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../services/project.service";
import {Project} from "../table-classes/project";
import {UUID} from "angular2-uuid";
import {NotificationType} from "../table-classes/notification-type";
import {NotificationStatus} from "../table-classes/notification-status";
import {Notification} from "../table-classes/notification";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.css']
})

export class ParticipationsComponent implements OnInit {

  userSource: User;
  userParticipations: Project[] = [];
  currentProject: Project;
  statusCode: number;
  requestProcessing = false;
  statusCodeUser: number;
  statusCodeParticipations: number;
  statusCodeProject: number;
  statusCodeNotification: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router) {}

  ngOnInit(){
    this.getUser();
  }

  getUser() {
    this.preProcessConfigurations();
    this.userService.getCurrentUser()
      .subscribe(
        data => {this.userSource = data;
        console.log(data);
        this.getMyParticipations()},
        errorCode => this.statusCodeUser);
  }

  getMyParticipations(){
    for(var i = 0; i < this.userSource.projectsParticipated.length; i++) {
      this.projectService.getProject(this.userSource.projectsParticipated[i])
        .subscribe(
          data => {
            console.log(data);
            this.userParticipations.push(data);
          },
          errorCode => this.statusCodeParticipations);
    }
  }

  leaveProject(projectId){
    var index = this.userSource.projectsParticipated.indexOf(projectId);
    if (index > -1) {
      this.userSource.projectsParticipated.splice(index, 1);
    }
    this.userSource.password = null;
    this.userService.updateUser(this.userSource)
      .subscribe(successCode => {
          this.statusCodeUser = successCode;
          this.getMyParticipations();
          this.projectService.getProject(projectId)
            .subscribe(
              data => {this.currentProject = data;
                let notification = new Notification(UUID.UUID(),NotificationType.LEAVEINFO, this.userSource,
                  this.currentProject.owner,this.currentProject,NotificationStatus.UNREAD, "Вынужден покинуть проект");

                this.notificationService.createNotification(notification)
                  .subscribe(successCode => {
                      this.statusCodeNotification = successCode;},
                    errorCode => this.statusCodeNotification = errorCode);},
              errorCode => this.statusCodeProject);
        },
        errorCode => this.statusCodeUser = errorCode);

    // this.projectService.getProject(projectId)
    //   .subscribe(
    //     data => {this.currentProject = data;},
    //     errorCode => this.statusCodeProject);
    //
    // let notification = new Notification(UUID.UUID(),NotificationType.LEAVEINFO, this.userSource,
    //   this.currentProject.owner,this.currentProject,NotificationStatus.UNREAD, "Вынужден покинуть проект");
    //
    // this.notificationService.createNotification(notification)
    //   .subscribe(successCode => {
    //       this.statusCodeNotification = successCode;},
    //     errorCode => this.statusCodeNotification = errorCode);

  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.requestProcessing = true;
  }

}
