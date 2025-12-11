import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.url);
    if (request.url.includes('login') || request.url.includes('register'))
      return next.handle(request);
    const clone = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('doppiatori')),
    });

    return next.handle(clone).pipe(
      catchError((err: HttpErrorResponse) => {
        const EXCLUDED_URLS = ['/landing', '/compare'];
        console.log(window.location);
        if (
          err.status === 401 &&
          !EXCLUDED_URLS.some((url) => window.location.href.includes(url))
        ) {
          this.router.navigate(['/auth']);
        }
        throw err;
      })
    );
  }
}
