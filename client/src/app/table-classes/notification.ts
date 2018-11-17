import {User} from "./user";
import {NotificationType} from "./notification-type";
import {NotificationStatus} from "./notification-status";

export class Notification {
  constructor(public id: string, public type: NotificationType, public from: User, public to: User,
              public status: NotificationStatus, public description: string) {
  }
}
