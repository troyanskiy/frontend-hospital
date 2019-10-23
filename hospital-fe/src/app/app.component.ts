import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, interval, merge, Observable } from 'rxjs';
import {
  BeforeAfterStatistic,
  QuarantineService
} from './simulation/services/quarantine.service';
import { HistoryService } from './simulation/services/history.service';
import { filter, switchMapTo } from 'rxjs/operators';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  history$: Observable<BeforeAfterStatistic[]>;

  automaticCalculationInterval = 1000;

  @ViewChild('newSimulationButton', { static: false, read: ElementRef })
  newSimulationButton: ElementRef;

  @ViewChild('autoModeSlideToggle', { static: false })
  autoModeSlideToggle: MatSlideToggle;

  constructor(private quarantineService: QuarantineService,
              private historyService: HistoryService) {
  }

  ngAfterViewInit(): void {
    const result$ = this.setUpStartStopEvents().pipe(switchMapTo(this.quarantineService.runSimulation()));
    this.history$ = this.historyService.getHistory(result$);
  }

  setUpStartStopEvents(): Observable<unknown> {
    const autoModeSwitchedOn$ = interval(this.automaticCalculationInterval).pipe(
      filter(() => this.autoModeSlideToggle.checked),
    );
    const newSimulationClicks$ = fromEvent(this.newSimulationButton.nativeElement, 'click');
    return merge<unknown>(newSimulationClicks$, autoModeSwitchedOn$);
  }

}
