import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  @Input()
  expanded: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
