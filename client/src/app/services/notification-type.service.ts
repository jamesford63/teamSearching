import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {NotificationType} from '../table-classes/notification-type';
import {map} from "rxjs/operators";
import {catchError} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";

@Injectable()
export class NotificationTypeService {
  notificationTypeUrl = 'http://localhost:9090/notification-types';

  constructor(private http: Http) {}

  getAllNotificationTypes(): Observable<NotificationType[]> {
    return this.http.get(this.notificationTypeUrl)
      .pipe(map(this.extractData)
      ,catchError(this.handleError))
  }

  createNotificationType(notificationType: NotificationType): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: cpHeaders});
    return this.http.post(this.notificationTypeUrl, notificationType, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  updateNotificationType(notificationType: NotificationType): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.notificationTypeUrl, notificationType, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  deleteNotificationType(id: string): Observable<any> {
    return this.http.delete(this.notificationTypeUrl + '/' + id)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  getNotificationType(id: string): Observable<NotificationType> {
    return this.http.get(this.notificationTypeUrl + '/' + id)
      .pipe(map(this.extractData)
      ,catchError(this.handleError))
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
