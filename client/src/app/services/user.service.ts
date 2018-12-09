import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../table-classes/user';
import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs/index";
import {FilterRequest} from "../table-classes/filter-request";

@Injectable()
export class UserService {
  userUrl = 'http://localhost:9090/users';

  constructor(private http: Http) {}

  getAllUsers(): Observable<User[]> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.get(this.userUrl, options)
      .pipe(map(this.extractData)
      ,catchError(this.handleError))
  }

  getFilteredUsers(filterRequest: FilterRequest): Observable<User[]> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: cpHeaders, withCredentials: true});
    return this.http.put(this.userUrl + '/filter', filterRequest, options)
      .pipe(map(this.extractData)
        ,catchError(this.handleError));
  }

  createUser(user: User): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: cpHeaders});
    return this.http.post(this.userUrl + '/register', user, options)
      .pipe(map(success => success.status),
      catchError(this.handleError));
  }

  updateUser(user: User): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders, withCredentials: true});
    return this.http.put(this.userUrl, user, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  deleteUser(userId: string): Observable<any> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.delete(this.userUrl + '/' + userId, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  getUserById(userId: string): Observable<User> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.get(this.userUrl + '/' + userId, options)
      .pipe(map(this.extractData)
      ,catchError(this.handleError))
  }

  getCurrentUser(): Observable<User> {
    const cpHeaders = new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type':'application/json' });
    const options = new RequestOptions({headers: cpHeaders, withCredentials: true});
    return this.http.get(this.userUrl + '/current', options)
      .pipe(map(this.extractData)
        ,catchError(this.handleError))
  }

  authorize(userLogin: string, userPassword: string): Observable<any> {
    const cpHeaders = new Headers({'Access-Control-Allow-Origin': '*'});
    const options = new RequestOptions({headers: cpHeaders, withCredentials: true});
    return this.http.post('http://localhost:9090/login?username=' + userLogin + '&password=' + userPassword, options)
      .pipe(map(success => success.status),
      catchError(this.handleError))
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return throwError(new Error(error.status))
  }
}
