import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quarantine } from 'hospital-lib';

@Injectable({
  providedIn: 'root'
})
export class PatientsDataService {
  private url = environment.server + '/patients';

  constructor(private http: HttpClient) {
  }

  getPatients(): Observable<Quarantine> {
    return this.http.get<Quarantine>(this.url);
  }
}
