import {Component, OnInit} from "@angular/core";
import {User} from "../table-classes/user";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../services/project.service";
import {UserService} from "../services/user.service";
import {NotificationService} from "../services/notification.service";
import {Notification} from "../table-classes/notification";
import {NotificationType} from "../table-classes/notification-type";
import {UUID} from "angular2-uuid";
import {NotificationStatus} from "../table-classes/notification-status";
import {Project} from "../table-classes/project";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {
  userSource: User;
  userNotifications: Notification[] = [];
  projectToUpdate: Project;
  statusCode: number;
  requestProcessing = false;
  statusCodeUser: number;
  statusCodeNotifications: number;
  statusCodeProject: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.preProcessConfigurations();
    this.userService.getCurrentUser()
      .subscribe(
        data => {
          this.userSource = data;
          this.getUserNotifications();
        },
        errorCode => this.statusCodeUser);
  }

  getUserNotifications() {
    this.preProcessConfigurations();
    this.notificationService.getUserNotifications(this.userSource.id)
      .subscribe(
        data => {
          this.userNotifications = data;
        },
        errorCode => this.statusCodeNotifications);
  }

  accept(toUser, project, notificationId, projectId) {
    let confirmation = new Notification(UUID.UUID(), NotificationType.INFORMATION, this.userSource, toUser,
      project, NotificationStatus.UNREAD, this.userSource.name + " " + this.userSource.lastName + " утвердил ваше участие в проекте");
    this.notificationService.createNotification(confirmation)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
        },
        errorCode => this.statusCodeNotifications = errorCode);

    this.notificationService.deleteNotification(notificationId)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
        },
        errorCode => this.statusCodeNotifications = errorCode);

    this.projectService.getProject(projectId)
      .subscribe(
        data => {
          console.log(toUser);
          this.projectToUpdate = data;
          this.projectToUpdate.participants.push(toUser);
          this.projectService.updateProject(this.projectToUpdate)
            .subscribe(successCode => {
                this.statusCodeProject = successCode;
              },
              errorCode => this.statusCodeProject = errorCode);
          this.projectToUpdate = null;
        },
        errorCode => this.statusCodeProject);
  }

  decline(toUser, project, notificationId) {
    let confirmation = new Notification(UUID.UUID(), NotificationType.INFORMATION, this.userSource, toUser,
      project, NotificationStatus.UNREAD, this.userSource.name + " " + this.userSource.lastName + " отклонил вашу заявку на участие в проекте");
    this.notificationService.createNotification(confirmation)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
        },
        errorCode => this.statusCodeNotifications = errorCode);

    this.notificationService.deleteNotification(notificationId)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
        },
        errorCode => this.statusCodeNotifications = errorCode);
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.statusCodeUser = null;
    this.requestProcessing = true;
  }
}
