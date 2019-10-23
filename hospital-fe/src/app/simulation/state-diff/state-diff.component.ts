import { Component, Input } from '@angular/core';
import { StateDiff } from '../services/quarantine.service';

@Component({
  selector: 'app-state-diff',
  templateUrl: './state-diff.component.html',
  styleUrls: ['./state-diff.component.scss']
})
export class StateDiffComponent {

  @Input()
  diff: StateDiff;
}
