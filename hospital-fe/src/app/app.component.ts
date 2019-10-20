import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Drug } from 'hospital-lib/dist/state-machine.types';
import { DrugsService } from './simulation/services/drugs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hospital-fe';
  currentDrugs$: Observable<Drug[]>;

  constructor(private drugsService: DrugsService) {
  }

  runNewSimulation() {
    console.log('new simu');
    this.currentDrugs$ = this.drugsService.getDrugs();
  }
}
