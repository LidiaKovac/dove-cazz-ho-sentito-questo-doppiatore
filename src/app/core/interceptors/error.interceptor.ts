import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, OperatorFunction, retry, tap, throwError, timer } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { AlertService } from 'src/app/shared/components/feedback/alert/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertSrv: AlertService,
    private loadingSrv: LoadingService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const catchErr: OperatorFunction<HttpEvent<any>, HttpEvent<unknown>> = catchError((err) => {
      this.alertSrv.addAlert(err.error.message, 'error');
      this.loadingSrv.setLoading = false;
      return throwError(() => err);
    });
    if (request.url.includes('/user/me') && request.method === 'GET') {
      return next.handle(request);
    }
    if (request.url.includes('compare') || request.url.includes('works?query=')) {
      return next.handle(request).pipe(
        retry({
          count: 3,
          delay: (_, count) => timer(5000 * count),
        }),
        catchErr,
      );
    }
    return next.handle(request).pipe(catchErr);
  }
}
