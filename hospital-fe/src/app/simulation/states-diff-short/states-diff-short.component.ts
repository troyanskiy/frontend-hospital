import { Component, Input } from '@angular/core';
import { StateDiff } from '../services/quarantine.service';

@Component({
  selector: 'app-states-diff-short',
  templateUrl: './states-diff-short.component.html',
  styleUrls: ['./states-diff-short.component.scss']
})
export class StatesDiffShortComponent {

  @Input()
  patientStates: StateDiff[];
}
