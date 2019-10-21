import { Component, Input, OnInit } from '@angular/core';
import { Drug } from 'hospital-lib/dist/state-machine.types';
import { possibleDrugs } from 'hospital-lib';

@Component({
  selector: 'app-drugs-names',
  templateUrl: './drugs-names.component.html',
  styleUrls: ['./drugs-names.component.scss']
})
export class DrugsNamesComponent implements OnInit {

  @Input()
  drugs: Drug[];

  drugsFullNames: string;

  possibleDrugs = possibleDrugs;

  constructor() {
  }

  ngOnInit() {
    this.drugsFullNames = this.drugs.map(drug => possibleDrugs[drug]).join(', ');
  }


}
