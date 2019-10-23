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

  summaryDisplayed = this.expanded;

  hideSummary() {
    this.summaryDisplayed = true;
  }

  showSummary() {
    this.summaryDisplayed = false;
  }
}
