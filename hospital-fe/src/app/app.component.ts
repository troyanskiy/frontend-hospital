import { Component } from '@angular/core';
import {Quarantine} from 'hospital-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hospital-fe';

  runNewSimulation() {
    console.log('new simu');
    Quarantine
  }
}
