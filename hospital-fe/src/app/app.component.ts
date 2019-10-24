import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, interval, merge, Observable } from 'rxjs';
import { QuarantineService, Simulation } from './simulation/services/quarantine.service';
import { HistoryService } from './simulation/services/history.service';
import { filter, switchMapTo } from 'rxjs/operators';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  history$: Observable<Simulation[]>;

  automaticCalculationInterval = environment.defaultAutoModeInterval;

  @ViewChild('newSimulationButton', { static: false, read: ElementRef })
  newSimulationButton: ElementRef;

  @ViewChild('autoModeSlideToggle', { static: false })
  autoModeSlideToggle: MatSlideToggle;

  constructor(private quarantineService: QuarantineService,
              private historyService: HistoryService) {
  }

  ngAfterViewInit(): void {
    const result$ = this.setUpStartStopEvents().pipe(switchMapTo(this.quarantineService.runSimulation()));
    this.history$ = this.historyService.getReverseChronologicalHistory(result$);
  }

  private setUpStartStopEvents(): Observable<unknown> {
    const autoModeTicks$ = interval(this.automaticCalculationInterval).pipe(
      filter(() => this.autoModeSlideToggle.checked),
    );
    const newSimulationClicks$ = fromEvent(this.newSimulationButton.nativeElement, 'click');
    return merge<unknown>(newSimulationClicks$, autoModeTicks$);
  }

}
