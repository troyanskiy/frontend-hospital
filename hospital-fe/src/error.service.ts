import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const duration = 3000;

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private _snackBar: MatSnackBar, private zone: NgZone) {
  }

  showServerError(error: string) {
    this.openSnackBar(error, 'Server problem, click to reload');
  }

  showClientError(error: string) {
    this.openSnackBar(error, 'Application problem, click to reload');
  }

  openSnackBar(error: string, errorType: string) {
    this.zone.run(() => {
      this._snackBar.open(error, errorType, {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      })
        .onAction().subscribe(() => {
        window.location.reload();
      });
    });

  }
}
