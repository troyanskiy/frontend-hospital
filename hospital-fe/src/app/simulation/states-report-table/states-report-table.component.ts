import { Component, Input } from '@angular/core';
import { StateDiff } from '../services/quarantine.service';
import { possibleStates } from 'hospital-lib';

@Component({
  selector: 'app-states-report-table',
  templateUrl: './states-report-table.component.html',
  styleUrls: ['./states-report-table.component.scss']
})
export class StatesReportTableComponent {

  displayedColumns: (keyof StateDiff) [] = ['state', 'numberOfPatientsBefore', 'after'];

  @Input()
  patientStates: StateDiff[] = [];

  patientStatesFullNames = possibleStates;

}
