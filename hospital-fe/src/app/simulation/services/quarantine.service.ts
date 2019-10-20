import { Injectable } from '@angular/core';
import { DrugsService } from './drugs.service';
import { PatientsDataService } from './patients-data.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PatientsRegister, Quarantine } from 'hospital-lib';
import { Drug } from 'hospital-lib/dist/state-machine.types';

export interface Simulation {
  before: PatientsRegister;
  after: PatientsRegister;
  drugs: Drug[];
}

@Injectable({
  providedIn: 'root'
})
export class QuarantineService {

  constructor(private drugsService: DrugsService,
              private patientDataService: PatientsDataService) {
  }

  runSimulation(): Observable<Simulation> {
    console.log('new simu');
    const currentDrugs$ = this.drugsService.getDrugs();
    const currentPatients$ = this.patientDataService.getGroupedPatients();
    return forkJoin(currentDrugs$, currentPatients$).pipe(
      (map(([drugs, patientsBefore]) => {
          const quarantine = new Quarantine(patientsBefore);
          quarantine.setDrugs(drugs);
          quarantine.wait40Days();
          return {
            before: patientsBefore,
            drugs,
            after: quarantine.report()
          };
        }
      )));
  }
}
