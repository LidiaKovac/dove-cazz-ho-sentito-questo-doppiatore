import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../components/feedback/alert/alert.service';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private alertSrv: AlertService,
    private loadingSrv: LoadingService,
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/user/me') && request.method === "GET") {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        this.alertSrv.addAlert(err.error.message, "error");
        this.loadingSrv.setLoading = false
        return throwError(() => err);
      }),
    );
  }
}
