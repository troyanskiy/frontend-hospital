import { Injectable } from '@angular/core';
import { DrugsService } from './drugs.service';
import { PatientsDataService } from './patients-data.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Drug, PatientsRegister, Quarantine, State } from 'hospital-lib';


export interface StateDiff {
  state: State;
  before: number;
  after: number;
}

export interface BeforeAfterStatistic {
  drugs: Drug[];
  patients: StateDiff[];
}

@Injectable({
  providedIn: 'root'
})
export class QuarantineService {

  constructor(private drugsService: DrugsService,
              private patientDataService: PatientsDataService) {
  }

  runSimulation(): Observable<BeforeAfterStatistic> {
    const currentDrugs$ = this.drugsService.getDrugs();
    const currentPatients$ = this.patientDataService.getGroupedPatients();
    return forkJoin(currentDrugs$, currentPatients$).pipe(
      (map(([drugs, patientsBefore]) => {
          const quarantine = new Quarantine(patientsBefore);
          quarantine.setDrugs(drugs);
          quarantine.wait40Days();
          return this.mapToBasArray(patientsBefore, quarantine.report(), drugs);
        }
      )));
  }

  private mapToBasArray(patientsBefore: PatientsRegister, patientsAfter: PatientsRegister, drugs: Drug[]): BeforeAfterStatistic {
    const beforePairs: [State, number][] = Object.entries(patientsBefore) as [State, number][];
    const patientsAfterCopy = { ...patientsAfter };
    const initialStatesHistory = beforePairs.map(([beforeState, beforeNumber]) => {
      const afterNumber = patientsAfter[beforeState] || 0;
      delete patientsAfterCopy[beforeState];
      return {
        state: beforeState,
        before: beforeNumber,
        after: afterNumber
      };
    });
    const newStatesPairs: [State, number][] = Object.entries(patientsAfterCopy) as [State, number][];
    const patients = initialStatesHistory.concat(newStatesPairs.map(([afterState, afterNumber]) => ({
        state: afterState,
        before: patientsBefore[afterState] || 0,
        after: afterNumber
      }
    )));
    return {
      drugs,
      patients
    };
  }
}
