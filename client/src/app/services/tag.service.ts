import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Tag} from '../table-classes/tag';
import {map} from "rxjs/operators";
import {catchError} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";

@Injectable()
export class TagService {
  tagUrl = 'http://localhost:9090/tags';

  constructor(private http: Http) {}

  getAllTags(): Observable<Tag[]> {
    return this.http.get(this.tagUrl)
      .pipe(map(this.extractData)
      ,catchError(this.handleError))
  }

  createTag(tag: Tag): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: cpHeaders});
    return this.http.post(this.tagUrl, tag, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  updateTag(tag: Tag): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.tagUrl, tag, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  deleteTag(tagId: string): Observable<any> {
    return this.http.delete(this.tagUrl + '/' + tagId)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  getTag(tagId: string, password: string): Observable<Tag> {
    return this.http.get(this.tagUrl + '/' + tagId)
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
