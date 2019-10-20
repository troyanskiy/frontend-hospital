import { Component, Input, OnInit } from '@angular/core';
import { Quarantine } from '../../../../hospital-lib/src';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  @Input()
  expanded: boolean;

  constructor() { }

  ngOnInit() {
  }
}