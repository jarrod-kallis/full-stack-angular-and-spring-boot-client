import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SESSION_STORAGE_TOKEN_KEY } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY);

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY)}`
        }
      });
    }

    return next.handle(req);
  }
}
