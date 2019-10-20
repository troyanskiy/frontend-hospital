import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { QuarantineService, Simulation } from './simulation/services/quarantine.service';
import { share } from 'rxjs/operators';

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
    this.results$ = this.quarantineService.runSimulation().pipe(share());
  }
}
