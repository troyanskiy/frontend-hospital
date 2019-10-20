import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  getHistory<T>(dataSource$: Observable<T>, historySize = environment.historySize): Observable<T[]> {
    return dataSource$.pipe(
      scan((acc: T[], curr: T) => {
        const res = acc.concat(curr);
        if (res.length > historySize) {
          res.shift();
        }
        return res;
      }, [])
    );
  }
}
