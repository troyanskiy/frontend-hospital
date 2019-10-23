import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drug, State } from 'hospital-lib';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { mapToArray } from './utils';

@Injectable({
  providedIn: 'root'
})
export class DrugsService {

  private url = environment.server + '/drugs';

  constructor(private http: HttpClient) {
  }

  getDrugs(): Observable<Drug[]> {
    return this.http.get<string>(this.url).pipe(
      map(response => mapToArray<Drug>(response)),
    );
  }
}
