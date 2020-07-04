import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new Subject<string>();
  private _message$ = this.messageSubject.asObservable();

  constructor() { }

  public get message$(): Observable<string> {
    return this._message$;
  }

  public sendMessage(message: string) {
    this.messageSubject.next(message);

    setTimeout(this.removeMessage.bind(this), 3000);
  }

  private removeMessage() {
    this.messageSubject.next(null);
  }
}
