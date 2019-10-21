import { Component } from '@angular/core';
import { interval, merge, Observable, Subject } from 'rxjs';
import {
  BeforeAfterStatistic,
  QuarantineService
} from './simulation/services/quarantine.service';
import { HistoryService } from './simulation/services/history.service';
import { partition, switchMapTo, takeUntil } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  history$: Observable<BeforeAfterStatistic[]>;
  automaticCalculationInterval = 1000;

  private newSimulationClicks$ = new Subject();
  private autoMode$ = new Subject<MatSlideToggleChange>();

  constructor(private quarantineService: QuarantineService,
              private historyService: HistoryService) {
    const result$ = this.setUpStartStopEvents().pipe(switchMapTo(quarantineService.runSimulation()));
    this.history$ = this.historyService.getHistory(result$);
  }

  setUpStartStopEvents(): Observable<void> {
    const [autoModeStartClicks$, autoModeStopClicks$] = partition((evt: MatSlideToggleChange) => evt.checked)(this.autoMode$);
    const intervalThatStops$ = interval(this.automaticCalculationInterval).pipe(takeUntil(autoModeStopClicks$));
    const autoModeStartingTrigger$ = autoModeStartClicks$.pipe(switchMapTo(intervalThatStops$));
    return merge<void>(this.newSimulationClicks$, autoModeStartingTrigger$);
  }

  runSimulation() {
    this.newSimulationClicks$.next();
  }

  automaticCheckboxValueChange(evt: MatSlideToggleChange) {
    this.autoMode$.next(evt);
  }
}
