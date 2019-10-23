import { Component, Input, OnInit } from '@angular/core';
import { Drug, possibleDrugs } from 'hospital-lib';

@Component({
  selector: 'app-drugs-names',
  templateUrl: './drugs-names.component.html',
  styleUrls: ['./drugs-names.component.scss']
})
export class DrugsNamesComponent {

  @Input()
  drugs: Drug[];
  possibleDrugs = possibleDrugs;

}
