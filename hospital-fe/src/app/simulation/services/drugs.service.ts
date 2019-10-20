import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drug } from 'hospital-lib/dist/state-machine.types';
import { environment } from '../../../environments/environment'; //todo try to do cleaner

@Injectable({
  providedIn: 'root'
})
export class DrugsService {

  private url = environment.server + '/drugs';

  constructor(private http: HttpClient) {
  }

  getDrugs(): Observable<Drug[]> {
    return this.http.get<Drug[]>(this.url);
  }
}
