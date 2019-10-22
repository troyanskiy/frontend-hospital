import { Component, Input, OnInit } from '@angular/core';
import { BeforeAfterStatistic } from './services/quarantine.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  @Input()
  expanded: boolean;

  summaryDisplayed: boolean = this.expanded;

  @Input()
  simulation: BeforeAfterStatistic;

  constructor() {
  }

  ngOnInit() {
  }

  hideSummary() {
    this.summaryDisplayed = true;
  }

  showSummary() {
    this.summaryDisplayed = false;
  }
}
