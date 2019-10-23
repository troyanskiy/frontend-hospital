import { Component, Input, OnInit } from '@angular/core';
import { Drug, possibleDrugs } from 'hospital-lib';

@Component({
  selector: 'app-drugs-list',
  templateUrl: './drugs-list.component.html',
  styleUrls: ['./drugs-list.component.scss']
})
export class DrugsListComponent {

  @Input()
  drugs: Drug[];

  @Input()
  isInline: boolean;

  possibleDrugs = possibleDrugs;
}
