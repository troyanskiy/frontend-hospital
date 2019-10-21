import { Component } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
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
    const autoModeStoppingTrigger$ = this.autoMode$.pipe(filter(evt => !evt.checked));

    const autoModeStartingTrigger$ = this.autoMode$.pipe(
      filter(evt => evt.checked),
      switchMapTo(interval(200)),
      takeUntil(autoModeStoppingTrigger$),
    );

    // const result$ = autoModeStartingTrigger$.pipe(
    //   switchMapTo(interval(1000).pipe(mapTo(quarantineService.runSimulation()))),
    //   takeUntil(autoModeStoppingTrigger$)
    // );
    // const result$: Observable<BeforeAfterStatistic> = this.newSimulationClicks$.pipe(switchMapTo(quarantineService.runSimulation()));
    const result$: Observable<BeforeAfterStatistic> = autoModeStartingTrigger$.pipe(switchMapTo(quarantineService.runSimulation()));
    this.history$ = this.historyService.getHistory(result$);
  }

  runSimulation() {
    this.newSimulationClicks$.next();
  }

  automaticCheckboxValueChange(evt: MatSlideToggleChange) {
    this.autoMode$.next(evt);
  }
}
