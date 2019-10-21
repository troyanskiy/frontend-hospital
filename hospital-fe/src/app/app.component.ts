import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  BeforeAfterStatistic,
  QuarantineService,
  Simulation
} from './simulation/services/quarantine.service';
import { HistoryService } from './simulation/services/history.service';
import { switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hospital-fe';
  history$: Observable<BeforeAfterStatistic[]>;
  private newSimulationClicks = new Subject();

  constructor(private quarantineService: QuarantineService,
              private historyService: HistoryService) {
    const result$: Observable<BeforeAfterStatistic> = this.newSimulationClicks.pipe(switchMapTo(quarantineService.runSimulation()));
    this.history$ = this.historyService.getHistory(result$, 2);
  }

  runSimulation() {
    this.newSimulationClicks.next();
  }
}
