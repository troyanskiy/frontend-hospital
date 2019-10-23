import { Injectable } from '@angular/core';
import { DrugsService } from './drugs.service';
import { PatientsDataService } from './patients-data.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Drug, PatientsRegister, Quarantine, State } from 'hospital-lib';

export interface StateDiff {
  state: State;
  numberOfPatientsBefore: number;
  after: number;
}

export interface Simulation {
  drugs: Drug[];
  patientsStatesDiffs: StateDiff[];
}

@Injectable({
  providedIn: 'root'
})
export class QuarantineService {

  constructor(private drugsService: DrugsService,
              private patientDataService: PatientsDataService) {
  }

  static mapToBas(patientsBefore: PatientsRegister, patientsAfter: PatientsRegister, drugs: Drug[]): Simulation {
    const beforePairs: [State, number][] = Object.entries(patientsBefore) as [State, number][];
    const patientsAfterCopy = { ...patientsAfter };
    const initialStatesHistory = beforePairs.map(([beforeState, beforeNumber]) => {
      const afterNumber = patientsAfter[beforeState] || 0;
      delete patientsAfterCopy[beforeState];
      return {
        state: beforeState,
        numberOfPatientsBefore: beforeNumber,
        after: afterNumber
      } as StateDiff;
    });
    const newStatesPairs: [State, number][] = Object.entries(patientsAfterCopy) as [State, number][];
    const patients = initialStatesHistory.concat(newStatesPairs.map(([afterState, afterNumber]) => ({
        state: afterState,
        numberOfPatientsBefore: patientsBefore[afterState] || 0,
        after: afterNumber
      } as StateDiff
    )));
    return {
      drugs,
      patientsStatesDiffs: patients
    };
  }

  runSimulation(): Observable<Simulation> {
    const currentDrugs$ = this.drugsService.getDrugs();
    const currentPatients$ = this.patientDataService.getPatients();
    return forkJoin(currentDrugs$, currentPatients$).pipe(
      map(([drugs, patientsBefore]) => {
          const quarantine = new Quarantine(patientsBefore);
          quarantine.setDrugs(drugs);
          quarantine.wait40Days();
          return QuarantineService.mapToBas(patientsBefore, quarantine.report(), drugs);
        }
      ));
  }
}
