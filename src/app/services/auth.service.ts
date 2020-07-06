import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Authentication } from '../models/Authentication.model';
import { API_URL, SESSION_STORAGE_TOKEN_KEY } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  private _authenticated$ = this.authenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): void {
    this.http.post<Authentication>(`${API_URL}/login`,
      new Authentication(false, username, password)
    )
      .pipe(
        map(authenticatedModel => authenticatedModel.authenticated)
      )
      .subscribe(authenticated => {
        if (authenticated === true) {
          sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY, 'Basic ' + window.btoa(username + ':' + password));
        }

        this.authenticatedSubject.next(authenticated);
      });
  }

  public get authenticated$(): Observable<boolean> {
    return this._authenticated$;
  }

  public logout(): void {
    sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
    this.authenticatedSubject.next(false);
  }

  public autoLogin(): void {
    this.authenticatedSubject.next(sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY) !== null);
  }
}
