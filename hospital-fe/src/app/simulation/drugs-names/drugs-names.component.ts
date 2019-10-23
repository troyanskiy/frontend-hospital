import { Component, Input, OnInit } from '@angular/core';
import { Drug, possibleDrugs } from 'hospital-lib';

@Component({
  selector: 'app-drugs-names',
  templateUrl: './drugs-names.component.html',
})
export class DrugsNamesComponent implements OnInit {

  @Input()
  drugs: Drug[];

  drugsFullNames: string;

  possibleDrugs = possibleDrugs;

  constructor() {
  }

  ngOnInit() {
    this.drugsFullNames = this.drugs.map(drug => possibleDrugs[drug]).join(', '); //fixme turn into pipe + ngFor
  }


}
