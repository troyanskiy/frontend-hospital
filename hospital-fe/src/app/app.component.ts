import { Component } from '@angular/core';
import { forkJoin, Observable, zip } from 'rxjs';
import { Drug } from 'hospital-lib/dist/state-machine.types';
import { DrugsService } from './simulation/services/drugs.service';
import { PatientsRegister, Quarantine } from 'hospital-lib';
import { PatientsDataService } from './simulation/services/patients-data.service';
import { map } from 'rxjs/operators';
import { QuarantineService, Simulation } from './simulation/services/quarantine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hospital-fe';
  results$: Observable<Simulation>;


  constructor(private quarantineService: QuarantineService) {

  }


  runSimulation() {
    this.results$ = this.quarantineService.runSimulation();
  }
}
