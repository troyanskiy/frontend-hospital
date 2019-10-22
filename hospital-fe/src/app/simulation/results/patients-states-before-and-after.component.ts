import { Component, Input, OnInit } from '@angular/core';
import { StateDiff } from '../services/quarantine.service';
import { possibleStates } from 'hospital-lib';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA = [
  { name: 'Hydrogen', weight: 5, symbol: 'H'},
  { name: 'Helium', weight: 4, symbol: 'He'},
  { name: 'Lithium', weight: 6, symbol: 'Li'},
  { name: 'Beryllium', weight: 9, symbol: 'Be'},
  { name: 'Boron', weight: 10, symbol: 'B'},

];


@Component({
  selector: 'app-patients-states-before-and-after',
  templateUrl: './patients-states-before-and-after.component.html',
  styleUrls: ['./patients-states-before-and-after.component.scss']
})
export class PatientsStatesBeforeAndAfterComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  @Input()
  patientStates: StateDiff[];

  patientStatesFullNames = possibleStates;

  constructor() {
  }

  ngOnInit() {
  }

}
