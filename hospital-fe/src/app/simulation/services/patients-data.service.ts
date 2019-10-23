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

  static mapPatientsStatesToRegister(states: State[]): PatientsRegister {
    return states.reduce((acc, state) => {
      return {
        ...acc,
        [state]: acc[state] ? acc[state] + 1 : 1
      };
    }, {} as PatientsRegister);
  }

  getPatients(): Observable<PatientsRegister> {
    return this.getPatientsStates().pipe(
      map(PatientsDataService.mapPatientsStatesToRegister)
    );
  }

  private getPatientsStates(): Observable<State[]> {
    return this.http.get<string>(this.url).pipe(
      map(response => mapToArray<State>(response))
    );
  }
}
