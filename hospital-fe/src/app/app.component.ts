import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Drug } from 'hospital-lib/dist/state-machine.types';
import { DrugsService } from './simulation/services/drugs.service';
import { Quarantine } from 'hospital-lib';
import { PatientsDataService } from './simulation/services/patients-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hospital-fe';
  currentDrugs$: Observable<Drug[]>;
  currentPatients$: Observable<Quarantine>;

  constructor(private drugsService: DrugsService,
              private patientDataService: PatientsDataService) {
  }

  runNewSimulation() {
    console.log('new simu');
    this.currentDrugs$ = this.drugsService.getDrugs();
    this.currentPatients$ = this.patientDataService.getPatients();
  }
}
