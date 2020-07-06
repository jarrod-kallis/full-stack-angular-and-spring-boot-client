import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL, SESSION_STORAGE_TOKEN_KEY } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== `${API_URL}/login`) {
      // const username = 'jarrod.kallis@gmail.com';
      // const password = 'password';

      // const basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);

      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY)
        }
      });
    }

    return next.handle(req);
  }
}
