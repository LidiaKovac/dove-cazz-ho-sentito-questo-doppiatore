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
    console.log('intercepting', request.url, request.method);
    const catchErr: OperatorFunction<HttpEvent<any>, HttpEvent<unknown>> = catchError((err) => {
      this.alertSrv.addAlert(err.error.message, 'error');
      this.loadingSrv.setLoading = false;
      return throwError(() => err);
    });
    if (request.url.includes('/user/me') && request.method === 'GET') {
      console.log('Skipping loading');
      return next.handle(request).pipe(
        tap(() => {
          this.loadingSrv.setLoading = false;
        }),
      );
    }
    if (request.url.includes('compare')) {
      return next.handle(request).pipe(
        retry({
          count: 3,
          delay: (_, count) => timer(1000 * count),
        }),
      );
    }
    return next.handle(request).pipe(catchErr);
  }
}
