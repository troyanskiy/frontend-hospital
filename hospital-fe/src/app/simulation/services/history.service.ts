import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  /**
   * Organizes the values emitted from the `dataSource$` observables the into arrays
   * of the size `historySize`. The emitted arrays contain the no more than `historySize`
   * last values of the dataSource$ organized by LIFO principle (old values in the end of
   * the array, new values are at the beginning of the array)
   *  dataSource$: ---1-----2-------3----------|
   *  function:    ---[1]---[2,1]---[3,2,1]----|
   * @example see marble tests in history.service.spec.ts
   */
  getReverseChronologicalHistory<T>(dataSource$: Observable<T>, historySize = environment.historySize): Observable<T[]> {
    return dataSource$.pipe(
      scan((acc: T[], curr: T) => {
        const res = [curr].concat(acc);
        if (res.length > historySize) {
          res.pop();
        }
        return res;
      }, [])
    );
  }
}
