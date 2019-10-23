import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientsRegister, State } from 'hospital-lib';
import { map, share } from 'rxjs/operators';
import { mapToArray } from './utils';

@Injectable({
  providedIn: 'root'
})
export class PatientsDataService {
  private url = environment.server + '/patients';

  constructor(private http: HttpClient) {
  }

  getPatients(): Observable<State[]> {
    return this.http.get<string>(this.url).pipe(
      map(response => mapToArray<State>(response))
    );
  }


  getGroupedPatients(): Observable<PatientsRegister> {
    return this.getPatients().pipe(
      map(states =>
        states.reduce((acc, state) => {
          return {
            ...acc,
            [state]: acc[state] ? acc[state] + 1 : 1
          };
        }, {} as PatientsRegister)),
      share());
  }
}
