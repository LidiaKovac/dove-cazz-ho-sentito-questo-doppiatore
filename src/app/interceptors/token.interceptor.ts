import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router

  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('login') || request.url.includes('register'))
      return next.handle(request);
    const clone = request.clone({
      headers: request.headers.set(
        'Authorization',
        "Bearer " + localStorage.getItem('doppiatori') as string,
      )
    });
    
    return next.handle(clone).pipe(catchError((err:HttpErrorResponse) => {
      if(err.status === 401 && !this.router.url.includes("landing")) {
        this.router.navigate(["/auth"])
      }
      throw err
    }));
  }
}
