import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, delay, finalize, map } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private requestCount = 0;

  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requestCount++;

    setTimeout(() => {
      if (this.requestCount > 0) this.spinnerService.show();
    }, 500);

    return next.handle(request).pipe(
      finalize(() => {
        this.requestCount--;

        if (this.requestCount === 0) {
          this.spinnerService.hide();
        }
      })
    );
  }
}
