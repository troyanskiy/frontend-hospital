import { Component } from '@angular/core';
import { forkJoin, Observable, zip } from 'rxjs';
import { Drug } from 'hospital-lib/dist/state-machine.types';
import { DrugsService } from './simulation/services/drugs.service';
import { PatientsRegister, Quarantine } from 'hospital-lib';
import { PatientsDataService } from './simulation/services/patients-data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hospital-fe';
  currentDrugs$: Observable<Drug[]>;
  currentPatients$: Observable<PatientsRegister>;
  results$: Observable<PatientsRegister>;


  constructor(private drugsService: DrugsService,
              private patientDataService: PatientsDataService) {
  }

  runNewSimulation() {
    console.log('new simu');
    this.currentDrugs$ = this.drugsService.getDrugs();
    this.currentPatients$ = this.patientDataService.getGroupedPatients();
    this.results$ =  forkJoin(this.currentDrugs$, this.currentPatients$).pipe(
      (map(([drugs, patients]) => {
          const quarantine = new Quarantine(patients);
          quarantine.setDrugs(drugs);
          debugger;
          quarantine.wait40Days();
          return quarantine.report();
        }
      )));
  }
}
