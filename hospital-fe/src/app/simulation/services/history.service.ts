import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Simulation } from './quarantine.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private history: Simulation[] = [];
  private maxHistorySize = environment.historySize;

  constructor() {
  }

  add(simulation: Simulation) {
    this.history.push(simulation);
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }
  }
}
