import { Component, Input } from '@angular/core';
import { Drug, possibleDrugs } from 'hospital-lib';

@Component({
  selector: 'app-drugs-panel',
  templateUrl: './drugs-panel.component.html',
  styleUrls: ['./drugs-panel.component.scss']
})
export class DrugsPanelComponent {

  @Input()
  drugs: Drug[] = [];
  possibleDrugs = possibleDrugs;

}
