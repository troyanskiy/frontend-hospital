import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QuarantineService, Simulation } from './simulation/services/quarantine.service';
import { HistoryService } from './simulation/services/history.service';
import { switchMap, switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hospital-fe';
  history$: Observable<Simulation[]>;
  private newSimulationClicks = new Subject();

  constructor(private quarantineService: QuarantineService,
              private historyService: HistoryService) {
    const result$ = this.newSimulationClicks.pipe(switchMapTo(quarantineService.runSimulation()));
    this.history$ = this.historyService.getHistory(result$, 2);
  }

  runSimulation() {
    this.newSimulationClicks.next();
  }
}
