import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Project} from '../table-classes/project';
import {map} from "rxjs/operators";
import {catchError} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";
import {FilterRequest} from "../table-classes/filter-request";

@Injectable()
export class ProjectService {
  projectUrl = 'http://localhost:9090/projects';

  constructor(private http: Http) {}

  getAllProjects(): Observable<Project[]> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.get(this.projectUrl, options)
      .pipe(map(this.extractData)
      ,catchError(this.handleError))
  }

  getFilteredProjects(filterRequest: FilterRequest): Observable<Project[]> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: cpHeaders, withCredentials: true});
    return this.http.post(this.projectUrl + '/filter', filterRequest, options)
      .pipe(map(this.extractData)
        ,catchError(this.handleError));
  }

  getUserProjects(userLogin: string): Observable<Project[]> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.get(this.projectUrl + '?user-login=' + userLogin, options)
      .pipe(map(this.extractData)
        ,catchError(this.handleError))
  }

  createProject(project: Project): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: cpHeaders, withCredentials: true});
    return this.http.post(this.projectUrl, project, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  updateProject(project: Project): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders, withCredentials: true });
    return this.http.put(this.projectUrl, project, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  deleteProject(projectId: string): Observable<any> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.delete(this.projectUrl + '?login=' + projectId, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  getProject(projectId: string): Observable<Project> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.get(this.projectUrl + '/' + projectId, options)
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
