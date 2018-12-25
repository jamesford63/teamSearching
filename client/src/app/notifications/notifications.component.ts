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
import {ProjectStatus} from "../table-classes/project-status";

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
  requestedUser: User;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
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
        errorCode => {
          this.statusCodeUser = errorCode;
          if (errorCode === 404) {
            this.router.navigate(['/login']);
          }
        });
  }

  getProject(projectId) {
    this.projectService.getProject(projectId)
      .subscribe(
        data => {
          this.projectToUpdate = data;
          console.log(this.projectToUpdate)
        },
        errorCode => this.statusCodeProject);
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
    this.getProject(projectId);

    let confirmation = new Notification(UUID.UUID(), NotificationType.ACCEPTINFO, this.userSource, toUser,
      project, NotificationStatus.UNREAD, this.userSource.name + " " + this.userSource.lastName + " утвердил ваше участие в проекте");
    this.notificationService.createNotification(confirmation)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
        },
        errorCode => this.statusCodeNotifications = errorCode);

    this.notificationService.deleteNotification(notificationId)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
          this.getUserNotifications()
        },
        errorCode => this.statusCodeNotifications = errorCode);

    this.projectToUpdate.participants.push(toUser);
    this.projectService.updateProject(this.projectToUpdate)
      .subscribe(successCode => {
          this.statusCode = successCode;
        },
        errorCode => this.statusCode = errorCode);
  }

  decline(toUser, project, notificationId) {
    let confirmation = new Notification(UUID.UUID(), NotificationType.DECLINEINFO, this.userSource, toUser,
      project, NotificationStatus.UNREAD, this.userSource.name + " " + this.userSource.lastName + " отклонил вашу заявку на участие в проекте");
    this.notificationService.createNotification(confirmation)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
        },
        errorCode => this.statusCodeNotifications = errorCode);

    this.notificationService.deleteNotification(notificationId)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
          this.getUserNotifications()
        },
        errorCode => this.statusCodeNotifications = errorCode);
  }

  ok(notificationId, projectId, from) {
    this.userSource.projectsParticipated.push(projectId.toString());
    this.userSource.password = null;
    this.userService.updateUser(this.userSource)
      .subscribe(successCode => {
          this.statusCodeUser = successCode;
        },
        errorCode => this.statusCodeUser = errorCode);

    this.notificationService.deleteNotification(notificationId)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
          this.getUserNotifications()
        },
        errorCode => this.statusCodeNotifications = errorCode);

    this.projectService.getProject(projectId)
      .subscribe(
        data => {
          this.projectToUpdate = data;
          this.projectToUpdate.participants.push(this.userSource);
          this.projectService.updateProject(this.projectToUpdate)
            .subscribe(successCode => {
                this.statusCodeProject = successCode;
              },
              errorCode => this.statusCodeProject = errorCode)
        },
        errorCode => this.statusCodeProject);
  }

  declined(notificationId) {
    this.notificationService.deleteNotification(notificationId)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
          this.getUserNotifications()
        },
        errorCode => this.statusCodeNotifications = errorCode);
  }

  fired(projectId, notificationId) {
    var index = this.userSource.projectsParticipated.indexOf(projectId);
    if (index > -1) {
      this.userSource.projectsParticipated.splice(index, 1);
    }
    this.userSource.password = null;
    this.userService.updateUser(this.userSource)
      .subscribe(successCode => {
          this.statusCodeUser = successCode;
        },
        errorCode => this.statusCodeUser = errorCode);

    this.notificationService.deleteNotification(notificationId)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
          this.getUserNotifications()
        },
        errorCode => this.statusCodeNotifications = errorCode);
  }

  left(projectId, userId, notificationId) {
    this.projectService.getProject(projectId)
      .subscribe(
        data => {
          this.projectToUpdate = data;
          this.projectToUpdate.participants.filter(item => item.id !== userId);
          this.projectService.updateProject(this.projectToUpdate)
            .subscribe(successCode => {
                this.statusCodeProject = successCode;
              },
              errorCode => this.statusCodeProject = errorCode)
        },
        errorCode => this.statusCodeProject);

    this.notificationService.deleteNotification(notificationId)
      .subscribe(successCode => {
          this.statusCodeNotifications = successCode;
          this.getUserNotifications()
        },
        errorCode => this.statusCodeNotifications = errorCode);
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
