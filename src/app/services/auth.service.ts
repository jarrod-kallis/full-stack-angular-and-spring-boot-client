import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  private _authenticated$ = this.authenticatedSubject.asObservable();

  constructor() { }

  login(username: string, password: string): void {
    const authenticated = username === 'jarrod.kallis@gmail.com' && password === 'password';

    if (authenticated === true) {
      sessionStorage.setItem('todoUser', username);
    }

    this.authenticatedSubject.next(authenticated);
  }

  public get authenticated$(): Observable<boolean> {
    return this._authenticated$;
  }

  public logout(): void {
    sessionStorage.removeItem('todoUser');
    this.authenticatedSubject.next(false);
  }

  public autoLogin(): void {
    this.authenticatedSubject.next(sessionStorage.getItem('todoUser') !== null);
  }
}
