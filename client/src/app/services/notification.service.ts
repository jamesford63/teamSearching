import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Notification} from '../table-classes/notification';
import {map} from "rxjs/operators";
import {catchError} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";

@Injectable()
export class NotificationService {
  notificationUrl = 'http://localhost:9090/notifications';

  constructor(private http: Http) {}

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get(this.notificationUrl)
      .pipe(map(this.extractData)
      ,catchError(this.handleError))
  }

  createNotification(notification: Notification): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: cpHeaders});
    return this.http.post(this.notificationUrl, notification, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  updateNotification(notification: Notification): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.notificationUrl, notification, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  deleteNotification(notificationId: string): Observable<any> {
    return this.http.delete(this.notificationUrl + '/' + notificationId)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  getNotification(notificationId: string): Observable<Notification> {
    return this.http.get(this.notificationUrl + '/' + notificationId)
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
