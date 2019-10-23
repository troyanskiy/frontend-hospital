import { Component, Input, OnInit } from '@angular/core';
import { Drug, possibleDrugs } from 'hospital-lib';

@Component({
  selector: 'app-drugs-short',
  templateUrl: './drugs-short.component.html',
  styleUrls: ['./drugs-short.component.scss']
})
export class DrugsShortComponent {

  @Input()
  drugs: Drug[];

  possibleDrugs = possibleDrugs;
}
