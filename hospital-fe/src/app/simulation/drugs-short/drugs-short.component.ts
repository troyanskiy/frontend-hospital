import { Component, Input, OnInit } from '@angular/core';
import { Drug } from 'hospital-lib';

@Component({
  selector: 'app-drugs-short',
  templateUrl: './drugs-short.component.html',
  styleUrls: ['./drugs-short.component.scss']
})
export class DrugsShortComponent implements OnInit {

  @Input()
  drugs: Drug[];

  drugsFormatted: string;

  constructor() {
  }

  ngOnInit() {
    this.drugsFormatted = this.formatDrugs();
  }

  private formatDrugs(): string {
    return this.drugs.length ? this.drugs
      .map(drugFullName => drugFullName.substring(0, 3))
      .join(', ') : 'No drugs given';
  }
}
