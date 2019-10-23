import { Component, Input } from '@angular/core';
import { Drug, possibleDrugs } from 'hospital-lib';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.scss']
})
export class DrugListComponent {

  @Input()
  drugs: Drug[] = [];

  @Input()
  isInline = false;

  possibleDrugs = possibleDrugs;
}
