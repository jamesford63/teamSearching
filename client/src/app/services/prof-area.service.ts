import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {ProfArea} from '../table-classes/prof-area';
import {map} from "rxjs/operators";
import {catchError} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";

@Injectable()
export class ProfAreaService {
  profAreaUrl = 'http://localhost:9090/prof-areas';

  constructor(private http: Http) {}

  getAllProfAreas(): Observable<ProfArea[]> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.get(this.profAreaUrl, options)
      .pipe(map(this.extractData)
      ,catchError(this.handleError))
  }

  createProfArea(profArea: ProfArea): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers: cpHeaders, withCredentials: true});
    return this.http.post(this.profAreaUrl, profArea, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  updateProfArea(profArea: ProfArea): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders, withCredentials: true });
    return this.http.put(this.profAreaUrl, profArea, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  deleteProfArea(id: string): Observable<any> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.delete(this.profAreaUrl + '/' + id, options)
      .pipe(map(success => success.status)
      ,catchError(this.handleError))
  }

  getProfArea(id: string): Observable<ProfArea> {
    const options = new RequestOptions({ withCredentials: true});
    return this.http.get(this.profAreaUrl + '/' + id, options)
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
