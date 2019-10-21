import { Component } from '@angular/core';
import { interval, merge, Observable, Subject } from 'rxjs';
import {
  BeforeAfterStatistic,
  QuarantineService
} from './simulation/services/quarantine.service';
import { HistoryService } from './simulation/services/history.service';
import { filter, switchMapTo, takeUntil } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hospital-fe';
  history$: Observable<BeforeAfterStatistic[]>;
  timer$ = interval(1000);

  private newSimulationClicks$ = new Subject();
  private autoMode$ = new Subject<MatSlideToggleChange>();

  constructor(private quarantineService: QuarantineService,
              private historyService: HistoryService) {
    const result$: Observable<BeforeAfterStatistic> = this.setUpStartStopEvents().pipe(switchMapTo(quarantineService.runSimulation()));
    this.history$ = this.historyService.getHistory(result$);
  }

  setUpStartStopEvents(): Observable<void> {
    const autoModeStoppedClicks$ = this.autoMode$.pipe(filter(evt => !evt.checked));
    const intervalThatStops$ = interval(1000).pipe(takeUntil(autoModeStoppedClicks$));
    const autoModeStartingTrigger$ = this.autoMode$.pipe(
      filter(evt => evt.checked),
      switchMapTo(intervalThatStops$),
    );
    return merge<void>(this.newSimulationClicks$, autoModeStartingTrigger$);
  }

  runSimulation() {
    this.newSimulationClicks$.next();
  }

  automaticCheckboxValueChange(evt: MatSlideToggleChange) {
    this.autoMode$.next(evt);
  }
}
