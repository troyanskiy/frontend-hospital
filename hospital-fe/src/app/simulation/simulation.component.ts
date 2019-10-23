import { Component, Input } from '@angular/core';
import { Simulation } from './services/quarantine.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent {
  @Input()
  expanded = false;
  @Input()
  simulation: Simulation;

  isSummaryDisplayed = this.expanded;

  hideSummary() {
    this.isSummaryDisplayed = true;
  }

  showSummary() {
    this.isSummaryDisplayed = false;
  }
}
