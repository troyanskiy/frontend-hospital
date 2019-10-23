import { Component, Input } from '@angular/core';
import { StateDiff } from '../services/quarantine.service';
import { possibleStates } from 'hospital-lib';

@Component({
  selector: 'app-patients-states-before-and-after',
  templateUrl: './patients-states-before-and-after.component.html',
  styleUrls: ['./patients-states-before-and-after.component.scss']
})
export class PatientsStatesBeforeAndAfterComponent {

  displayedColumns: (keyof StateDiff) [] = ['state', 'before', 'after'];

  @Input()
  patientStates: StateDiff[] = [];

  patientStatesFullNames = possibleStates;

}
