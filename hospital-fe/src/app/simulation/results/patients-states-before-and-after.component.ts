import { Component, Input, OnInit } from '@angular/core';
import { StateDiff } from '../services/quarantine.service';
import { possibleStates } from 'hospital-lib';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}




@Component({
  selector: 'app-patients-states-before-and-after',
  templateUrl: './patients-states-before-and-after.component.html',
  styleUrls: ['./patients-states-before-and-after.component.scss']
})
export class PatientsStatesBeforeAndAfterComponent implements OnInit {

  displayedColumns: (keyof StateDiff) []  = ['state', 'before', 'after'];

  @Input()
  patientStates: StateDiff[];

  patientStatesFullNames = possibleStates;

  constructor() {
  }

  ngOnInit() {
  }

}
