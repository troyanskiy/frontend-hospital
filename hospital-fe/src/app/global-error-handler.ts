import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

    const errorService = this.injector.get(ErrorService);

    if (error instanceof HttpErrorResponse) {
      errorService.showServerError(error.message);
    } else {
      errorService.showClientError(error.message);
    }
    console.error(error);
  }
}
