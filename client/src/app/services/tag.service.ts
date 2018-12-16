import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Tag} from '../table-classes/tag';
import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs/index";

@Injectable()
export class TagService {
  tagUrl = 'http://localhost:9090/tags';

  constructor(private http: Http) {
  }

  getAllTags(): Observable<Tag[]> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.get(this.tagUrl, options)
      .pipe(map(this.extractData)
        ,catchError(this.handleError))
  }

  createTag(tag: Tag): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: cpHeaders});
    return this.http.post(this.tagUrl, tag, options)
      .pipe(map(success => success.status),
        catchError(this.handleError));
  }

  updateTag(tag: Tag): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders, withCredentials: true});
    return this.http.put(this.tagUrl, tag, options)
      .pipe(map(success => success.status)
        ,catchError(this.handleError))
  }

  deleteTag(tagId: string): Observable<any> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.delete(this.tagUrl + '/' + tagId, options)
      .pipe(map(success => success.status)
        ,catchError(this.handleError))
  }

  getTagById(tagId: string): Observable<Tag> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.get(this.tagUrl + '/' + tagId, options)
      .pipe(map(this.extractData)
        ,catchError(this.handleError))
  }

  getTagByName(tagName: string): Observable<Tag> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.get(this.tagUrl + '?name=' + tagName, options)
      .pipe(map(this.extractData)
        ,catchError(this.handleError))
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return throwError(new Error(error.status))
  }

}
