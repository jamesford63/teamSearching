import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {User} from '../table-classes/user';
import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {Observable} from "rxjs/index";

@Injectable()
export class UserService {
  userUrl = 'http://localhost:9090/users';

  constructor(private http: Http) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get(this.userUrl)
      .pipe(map(this.extractData)
      ,catchError(this.handleError))
  }

  createUser(user: User): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: cpHeaders});
    return this.http.post(this.userUrl, user, options)
      .pipe(map(success => success.status),
      catchError(this.handleError));
  }

  updateUser(user: User): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.userUrl, user, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(this.userUrl + '/' + userId)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  getUser(userId: string): Observable<User> {
    return this.http.get(this.userUrl + '/' + userId)
      .pipe(map(this.extractData)
      ,catchError(this.handleError))
  }

  authorize(userLogin: string, userPassword: string): Observable<User> {
    return this.http.get(this.userUrl + '/' + userLogin)
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
