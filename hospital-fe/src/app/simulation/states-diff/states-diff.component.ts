import { Component, Input } from '@angular/core';
import { StateDiff } from '../services/quarantine.service';

@Component({
  selector: 'app-state-diff',
  templateUrl: './states-diff.component.html',
  styleUrls: ['./states-diff.component.scss']
})
export class StatesDiffComponent {

  @Input()
  diff: StateDiff;
}
