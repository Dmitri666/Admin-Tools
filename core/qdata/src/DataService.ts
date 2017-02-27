import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {DataRow} from './DataRow';
import {Observable} from 'rxjs';
import {QDescriptor} from './QDescriptor';
import {IProjection} from './IProjection';


@Injectable()
export class DataService {
  constructor(private http: Http) {

  }

  public post<TP extends IProjection>(query: QDescriptor, url: string): Observable<DataRow<TP>[]> {
    let body = JSON.stringify(query);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options)
      .map(res => <TP[]>res.json())
      .map(res => {
        let mapped: DataRow<TP>[] = [];
        res.forEach(d => mapped.push(new DataRow<TP>(d)));
        return mapped;

      });
  }

  public getAll<T>(query: QDescriptor, url: string): Observable<Array<T>> {
    let body = JSON.stringify(query);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options)
      .map(res => res.json());
  }
}
