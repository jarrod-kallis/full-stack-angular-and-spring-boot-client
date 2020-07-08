import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Authentication } from '../models/Authentication.model';
import { API_URL, SESSION_STORAGE_TOKEN_KEY } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<string> {
    return this.http.post<Authentication>(`${API_URL}/authenticate`, new Authentication(false, username, password))
      .pipe(
        map(response => response.token),
        tap(token => sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY, token))
      );
  }

  public logout(): void {
    sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    return sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY) !== null;
  }
}
